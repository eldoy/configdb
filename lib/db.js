const path = require('path')
const os = require('os')
const _ = require('lodash')
const cuid = require('cuid')
const match = require('./match.js')
const db = {}

function configdb(name) {
  if (!db[name]) db[name] = []

  function all(query, row) {
    return Object.keys(query).every(key => match(query[key], row[key]))
  }

  return {
    load: function(data) {
      db[name] = data
    },

    clear: function() {
      delete db[name]
    },

    create: function(values) {
      if (!values.id) values.id = cuid()
      db[name].push(values)
      return { id: values.id }
    },

    update: function(query, values) {
      const result = configdb(name).find(query)
      for (const row of result) {
        _.merge(row, values)
      }
      return { n: result.length }
    },

    delete: function(query) {
      const length = db[name].length
      db[name] = db[name].filter(row => {
        for (const key in query) {
          return !match(query[key], row[key])
        }
      })
      return { n: length - db[name].length }
    },

    get: function(query = {}) {
      return _.isEmpty(query)
        ? db[name][0]
        : db[name].find(row => all(query, row))
    },

    find: function(query, options = {}) {
      let result
      if (_.isEmpty(query)) {
        result = db[name]
      } else {
        const { $or } = query; delete query.$or
        result = db[name].filter(row => {
          return all(query, row) && (!$or || $or.some(q => all(q, row)))
        })
      }
      if (_.isPlainObject(options.sort) && !_.isEmpty(options.sort)) {
        const [field, value] = Object.entries(options.sort)[0]
        result = _.sortBy(result, field)
        if (value < 0) result.reverse()
      }
      if (options.skip) {
        result = result.slice(options.skip)
      }
      if (options.limit) {
        result = result.slice(0, options.limit)
      }
      return result
    },

    count: function(query) {
      return configdb(name).find(query).length
    }
  }
}

module.exports = configdb
