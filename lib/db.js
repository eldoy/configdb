const path = require('path')
const cuid = require('cuid')
const os = require('os')
const yaml = require('js-yaml')
const _ = require('lodash')
const { exist, write, read, ryml, wyml, resolve } = require('extras')
const match = require('./match.js')
const dbPath = process.env.WAVEDB_PATH || path.join(process.cwd(), process.env.WAVEDB_NAME || 'configdb.yml')

// Resolve path
// TODO: Move to extras 'resolve' function
const file = resolve(dbPath)

// Store db file
if (!exist(file)) write(file, '')
let db = ryml(file)

function configdb(name) {
  if (!db[name]) db[name] = []

  return {
    clear: function() {
      delete db[name]
      wyml(file, db)
    },

    create: function(values) {
      if (!values.id) values.id = cuid()
      db[name].push(values)
      wyml(file, db)
      return { id: values.id }
    },

    update: function(query, values) {
      const results = configdb(name).find(query)
      for (const row of results) {
        _.merge(row, values)
      }
      wyml(file, db)
      return { n: results.length }
    },

    delete: function(query) {
      const length = db[name].length
      db[name] = db[name].filter(row => {
        for (const key in query) {
          return !match(query[key], row[key])
        }
      })
      wyml(file, db)
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

    find: function(query) {
      return _.isEmpty(query)
      ? db[name]
      : db[name].filter(row => {
        for (const key in query) {
          return match(query[key], row[key])
        }
      })
    },

    count: function(query) {
      return configdb(name).find(query).length
    }
  }
}

module.exports = configdb
