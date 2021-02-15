const path = require('path')
const cuid = require('cuid')
const os = require('os')
const yaml = require('js-yaml')
const _ = require('lodash')
const { exist, write, read, resolve } = require('extras')
const match = require('./match.js')
const dbPath = process.env.CONFIGDB_PATH || path.join(process.cwd(), process.env.CONFIGDB_NAME || 'configdb.yml')

// Resolve path
const file = resolve(dbPath)

// Store db file
if (!exist(file)) write(file, '')
let db = read(file)

function configdb(name) {
  if (!db[name]) db[name] = []

  return {
    clear: function() {
      delete db[name]
      write(file, db)
    },

    create: function(values) {
      if (!values.id) values.id = cuid()
      db[name].push(values)
      write(file, db)
      return { id: values.id }
    },

    update: function(query, values) {
      const results = configdb(name).find(query)
      for (const row of results) {
        _.merge(row, values)
      }
      write(file, db)
      return { n: results.length }
    },

    delete: function(query) {
      const length = db[name].length
      db[name] = db[name].filter(row => {
        for (const key in query) {
          return !match(query[key], row[key])
        }
      })
      write(file, db)
      return { n: length - db[name].length }
    },

    get: function(query = {}) {
      return _.isEmpty(query)
        ? db[name][0]
        : db[name].find(row => {
          for (const key in query) {
            return match(query[key], row[key])
          }
        })
    },

    find: function(query, options = {}) {
      let results = _.isEmpty(query)
      ? db[name]
      : db[name].filter(row => {
        for (const key in query) {
          return match(query[key], row[key])
        }
      })
      if (options.sort) {
        const [field, value] = Object.entries(options.sort)[0]
        results = _.sortBy(results, field)
        if (value < 0) results.reverse()
      }
      if (options.skip) {
        results = results.slice(options.skip)
      }
      if (options.limit) {
        results = results.slice(0, options.limit)
      }
      return results
    },

    count: function(query) {
      return configdb(name).find(query).length
    }
  }
}

module.exports = configdb
