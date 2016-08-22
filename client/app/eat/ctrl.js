import _ from 'lodash'

class EatCtrl {
  /* @ngInject */
  constructor (meals) {
    // cache all the meals starting from the beginning of this day.
    this.cachedMeals = meals
    this.meals = meals
    this.startTime = new Date((Math.floor(new Date().getTime() / 60000)) * 60000)
    this.selectedHall = {
      Carm: true,
      Dewick: true
    }
    this.queryChanged()
  }

  queryChanged () {
    this.meals = _.filter(this.cachedMeals, (meal) => {
      return this.selectedHall[meal.diningHall] && meal.time >= this.startTime.toISOString()
    })
  }
}

export default EatCtrl
