'use strict'
// @flow
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
let routes
let log

const configLoader = require('./util/ConfigLoader')
const configDefault = require('../config/default')
const configTest = require('../config/test')
const configDev = require('../config/development')
const configProd = require('../config/production')
const wrench = require('wrench')
const app = express()

// Exporting at beginning of file to load configs and have
// the properties available when "use"ing modules. (Properties are loaded
// according to the ENV value)...
module.exports = app

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Configure middleware for all module resources.
 * This block filters out all the resource definition files for each
 * module and then maps them to the endpoint defined by their
 * module parent directory name
 */
function setupRoutes(){
  wrench.readdirSyncRecursive('./lib/routes/')
    .map(function(file) {
      const resource = '/'
        + configDefault.applicationName
        + '/api/'
        + configDefault.apiVersion
        + '/'
        + file.substring(file.indexOf('/')+1,file.lastIndexOf('/'))
  const location = './routes'
  app.use(resource, require(location))
});
}

// error handlers
if (app.get('env') === 'production') {
  // production error handler
  // no stacktraces leaked to user
  configLoader.loadConfigs(configDefault, configProd)
  setupRoutes()
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  })
  log = require('./util/Logger')
  log.info('express.js: Running in production mode (loading prod configs)...')
} else if (app.get('env') === 'development') {
  app.use(logger('dev'))
  // development error handler
  // will print stacktrace
  configLoader.loadConfigs(configDefault, configDev)
  setupRoutes()
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
  log = require('./util/Logger')
  log.info('express.js: Running in development mode (loading dev configs)...')
} else {
  // test error handler
  // will print stacktrace
  configLoader.loadConfigs(configDefault, configTest)
  setupRoutes()
  app.use('/test', require('../test/routes/index'))
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
  log = require('./util/Logger')
  log.info('express.js: Running in test mode (loading test configs)...')
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status = 404
  next()
})
