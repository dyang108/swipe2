var express = require('express')
var router = express.Router()

var meals = require('./meals')

router
  .route('/meals')
  .post(meals.addMeal)

module.exports = router
