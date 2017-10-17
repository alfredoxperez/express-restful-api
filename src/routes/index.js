// @flow
'use strict'
const express = require('express')
const router = express.Router()
const mongoDbService = require('../modules/MongoDbService')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  mongoDbService.getRandom().then(function (result) {
    res.send(result)
  })
})

/* POST home page. */
router.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  try{
    mongoDbService.addRecord(
      req.body.name, 
      req.body.category)
    res.sendStatus(200)
  } catch (erro) {
    res.sendStatus(500)
  }
})

module.exports = router
