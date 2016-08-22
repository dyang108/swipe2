var Meal = require('../models/meal')
// var moment = require('moment')

function addMeal (req, res, next) {
  Meal
    .create(req.body, (err, meal) => {
      if (err) {
        req.send(500)
      }
      res.send(meal)
    })
}

function getAll (req, res, next) {
  var queryObj = {}
  if (req.params.after !== '0') {
    queryObj.$gte = req.params.after
  }
  if (req.params.before !== '0') {
    queryObj.$lte = req.params.before
  }
  Meal
    .find({
      time: queryObj
    })
    .then((meals) => {
      res.send(meals)
    })
}

module.exports = {
  addMeal: addMeal,
  getAll: getAll
}
