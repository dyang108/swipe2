class EatCtrl {
  /* @ngInject */
  constructor () {
    this.startTime = new Date((Math.floor(new Date().getTime() / 60000)) * 60000)
  }
}

export default EatCtrl
