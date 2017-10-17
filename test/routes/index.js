'use strict'
// @flow
const express = require('express')
const router = express.Router()

/**
 * Creating these test routes is not the right way for testing. Ideally integration
 * points should be mocked or stubbed.  Unfortunately the suggested solution to stub
 * and mock 'request-promise' did not seem to work:
 * https://github.com/request/request-promise/issues/55
 **/

router.get('/', function (req, res, next) {
  res.send('test')
})

module.exports = router
