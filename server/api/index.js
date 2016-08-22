var express = require('express')
var router = express.Router()

var meals = require('./meals')

router
  .route('/meals')
  .post(meals.addMeal)

router
  .route('/meals/from/:after/to/:before')
  .get(meals.getAll)

module.exports = router
