module.exports = function (app) {
  require('./app-variables')(app)
  require('./static-middleware')(app)
  require('./mongo')(app)
}
