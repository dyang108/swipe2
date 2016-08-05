class AppCtrl {
  /* @ngInject */
  constructor ($state, $timeout, $scope) {
    $scope.date = new Date((Math.floor(new Date().getTime() / 60000)) * 60000)
    function count () {
      $scope.date = new Date((Math.floor(new Date().getTime() / 60000)) * 60000)
      return $timeout(count, 5000)
    }
    $timeout(count, 5000)
  }
}

export default AppCtrl
