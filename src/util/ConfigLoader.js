'use strict'
// @flow
const merge = require('merge')

/**
 * ConfigLoader.js
 *
 **/
let configs = {}

// Public Interface Implementation
const loadConfigs = function () {
  for (var i = 0; i < arguments.length; i++) {
    configs = merge(configs, arguments[i])
  }
}

const getConfigs = function () {
  return configs
}

// Public Interface
module.exports = {
  loadConfigs: loadConfigs,
  getConfigs: getConfigs
}
