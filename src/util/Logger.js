'use strict'
// @flow
const config = (require('./ConfigLoader')).getConfigs()
const bunyan = require('bunyan')

const enableConsole = config.logging.logToConsole
const enableFile = config.logging.logToFile

const appName = config.applicationName
const logsLocation = './logs/'
const logger = bunyan.createLogger({
  name: appName,
  streams: [{
    level: 'info',
    type: 'rotating-file',
    path: logsLocation + appName + '.log',
    period: '1d', // daily rotation
    count: 3, // keep 3 back copies
    reemitErrorEvents: false
  }, {
    level: 'error',
    type: 'rotating-file',
    path: logsLocation + appName + '-error.log',
    period: '1d', // daily rotation
    count: 3, // keep 3 back copies
    reemitErrorEvents: false
  }]
})

function log (level, msg, obj, request) {
  if (!obj) {
    obj = ''
  } else {
    obj = JSON.stringify(obj)
  }

  if (!request) {
    request = ''
  } else {
    request = JSON.parse(JSON.stringify(request))
    delete request.apiConnector
    request = {
      foreignApiRequest: request
    }
    request = JSON.stringify(request)
  }

  if (enableFile) {
    try {
      logger[level](msg, obj, request)
    } catch (err) {
      logger.error(err + obj, request)
    }
  }
  if (enableConsole) {
    switch (level) {
      case 'info':
        console.log('\n' + msg, obj, request)
        break
      case 'error':
        console.error('\n' + msg, obj, request)
        break
      default:
        console.error('Logger: ' + level + ' is an invalid level. Message is: ' + msg, obj)
    }
  }
}
log('info', 'Logger Initialized')

// Public Interface
module.exports = {
  info: function (msg: string, obj: any, request: any) { log('info', msg, obj, request) },
  err:  function (msg: string, obj: any, request: any) { log('error', msg, obj, request) }
}
