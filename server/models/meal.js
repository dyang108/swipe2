var mongoose = require('mongoose')

var Meal = new mongoose.Schema({
  user: String,
  img: String,
  diningHall: String,
  time: Date,
  numSwipes: Number
})

module.exports = mongoose.model('Meal', Meal)
