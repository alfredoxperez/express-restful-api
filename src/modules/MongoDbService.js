// @flow
'use strict'

const mongoose = require('mongoose')
const log = require('../util/Logger')
const configLoader = require('../util/ConfigLoader')

/**
 * MongoDbService.js
 * 
 */
configLoader.loadConfigs(require('../../config/mongodb'))
const configs = configLoader.getConfigs()
mongoose.Promise = global.Promise
const applicationName = (configs.applicationName).replace(/-/g,"")
mongoose.connect('mongodb://localhost/' + applicationName, { useMongoClient: true })
const Schema = mongoose.Schema
const mongoDbSchema = new Schema(configs.mongoDbObjectTemplate)
const mongodbResponseTemplate = configs.mongodbResponseTemplate
const mongoDbObjectModel = mongoose.model(
  applicationName + 'MongoDbModelName', mongoDbSchema)

function loadRecordsFromConfig () {
  mongoDbObjectModel.collection.drop()
  const records = configs.sampleRecords
  records.forEach(function (record) {
    addRecord(record.name, record.category)
  })
}

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

  let response = JSON.parse(JSON.stringify(mongodbResponseTemplate))
  return instance.save().then(savedRecord => {
    log.info('MongoDbService: successfully added record: ', savedRecord)
    return response
  }).catch(err => {
    if(err.code = 11000){
      log.info('MongoDbService: addRecord: found duplicate for: ', instance)
    }
    log.err('MongoDbService: error: ', err)
    return response
  })
}


/**
 * getRecords()
 */
const getRecords: Function = function() {
  return mongoDbObjectModel.find({}).then(function(docs) {return docs})
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
  getRandom: getRandom,
  getRecords: getRecords
}
