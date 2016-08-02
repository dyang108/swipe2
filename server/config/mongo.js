module.exports = function (app) {
  var mongoose = require('mongoose')
  mongoose.Promise = require('bluebird')
  mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test')
  var bodyParser = require('body-parser')
  app.use(bodyParser.json())
}
