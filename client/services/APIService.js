class APIService {
  /* @ngInject */
  constructor (Restangular) {
    this.Restangular = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/api')
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      })
    })
  }

  postMeal (meal) {
    return this.Restangular
      .all('meals')
      .post(meal)
      .then(meal => meal.plain())
  }

  getMeals (from, to) {
    return this.Restangular
      .all('meals')
      .one('from', from)
      .one('to', to)
      .get()
      .then(meals => meals.plain())
  }
}

export default APIService
