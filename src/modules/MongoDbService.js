'use strict';
// @flow
const mongoose = require('mongoose')
const log = require('../util/Logger')
const configLoader = require('../util/ConfigLoader')
configLoader.loadConfigs(require('../../config/mongodb'))
const configs = configLoader.getConfigs()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/' + configs.applicationName
  , { useMongoClient: true })

const Schema = mongoose.Schema

const mongoDbSchema = new Schema(configs.mongoDbObjectTemplate)
const mongoDbObjectModel = mongoose.model(
  configs.applicationName + 'MongoDbModelName', 
  mongoDbSchema)

function loadRecordsFromConfig () {
  mongoDbObjectModel.collection.drop()
  const records = configs.sampleRecords
  records.forEach(function (record) {
    addRecord(record.name, record.category)
  })
};

/**
 * addRecord()
 * Example function to add a record to mongodb. 
 * 
 * @param {*} name 
 * @param {*} category 
 */
const addRecord = function (name: string, category: string) {
  const instance = new mongoDbObjectModel()

  instance.name = name
  instance.category = category

  instance.save(function (err) {
    if (err != null) { 
      log.err('MongoDBService error: ', err) 
      //TODO: throw error
    }
  })
}

/**
 * getRandom()
 * Example function to get a record from mongodb. 
 */
const getRandom = function () {
  return mongoDbObjectModel.find({}).then(function (docs) {
    return docs[Math.floor(Math.random() * docs.length)]
  })
};

(function init() {
  if (configs.loadSampleRecords) {
    loadRecordsFromConfig()
  }
})()

log.info('MongoDbService: Initialized')
module.exports = {
  addRecord: addRecord,
  getRandom: getRandom
}
