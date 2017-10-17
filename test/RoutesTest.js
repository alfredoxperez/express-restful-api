'use strict'
// @flow
/* global describe it */
const app = require('../lib/app.js')
const cl = require('../lib/util/ConfigLoader')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const configs = cl.getConfigs()
const apiUri = '/'
  + configs.applicationName
  + '/api/'
  + configs.apiVersion

describe('RoutesTest:', function () {
  it('should return a mongodb object', function (done) {
    chai.request(app)
      .get(apiUri)
      .end(function (err, res) {
        setTimeout(function(){
          assert.ok(res.body._id)
          assert.ok(res.body.category)
          assert.ok(res.body.name)
          done()
        }, 1500)
      })
  })
})
