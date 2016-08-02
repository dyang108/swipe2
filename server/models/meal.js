var mongoose = require('mongoose')

var Meal = new mongoose.Schema({
  user: String,
  img: String,
  hall: String,
  time: Date,
  numswipes: Number
})

module.exports = mongoose.model('Meal', Meal)
