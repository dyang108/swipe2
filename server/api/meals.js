var Meal = require('../models/meal')

function addMeal (req, res, next) {
  Meal
    .create(req.body, (err, thing) => {
      if (err) {
        req.send(500)
      }
      res.send(thing)
    })
}

module.exports = {
  addMeal: addMeal
}
