// var favicon = require('serve-favicon')
var serveStatic = require('serve-static')
var path = require('path')

module.exports = function (app) {
  app.use(serveStatic(path.join(__dirname, '../../client')))
  // app.use(favicon(app.get('faviconPath')))
}
