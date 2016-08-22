class RootCtrl {
  /* @ngInject */
  constructor ($rootScope) {
    $rootScope.$on('fbLoggedIn', (response) => {
      console.log('here')
      console.log(response)
    })
  }
}

export default RootCtrl
