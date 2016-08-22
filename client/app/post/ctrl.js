class PostCtrl {
  /* @ngInject */
  constructor (APIService, $timeout) {
    this.meal = {
      time: new Date((Math.ceil(new Date().getTime() / 60000)) * 60000),
      numSwipes: 1,
      diningHall: 'Carm'
    }
    this.APIService = APIService
    this.showTimingError = false
    this.$timeout = $timeout
  }

  postMeal () {
    if (this.meal.time < new Date().getTime()) {
      this.showTimingError = true
      return
    }
    this.APIService.postMeal(this.meal).then((posted) => {
      this.showSuccessMsg = true
      this.$timeout(() => {
        this.showSuccessMsg = false
      }, 2000)
    })
  }
}

export default PostCtrl
