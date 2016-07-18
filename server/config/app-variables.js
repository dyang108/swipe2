var path = require('path')
var express = require('express')

module.exports = function (app) {
  app.set('views', path.join(__dirname, '../../client'))
  app.set('views', path.join(__dirname, '../../client'))
  app.set('view engine', 'ejs')
  app.set('faviconPath', path.join(__dirname, '../../client/img/favicon.png'))
  app.use(express.static(path.join(__dirname, '../../client')))
}
