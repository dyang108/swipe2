import angular from 'angular'

// import 'lodash'
import 'angular-ui-router.statehelper'
import 'angular-ui-router'
import 'restangular'
import 'angular-toastr'
import 'angular-moment'
import './css'
import appRoot from './app'
import template from './index.html'
import services from './services'
import controller from './ctrl.js'

var app = angular.module('app', [
  'ui.router',
  'ui.router.stateHelper',
  'restangular',
  'toastr',
  'angularMoment'
])

/* @ngInject */
function config (stateHelperProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)
  stateHelperProvider.state({
    name: 'index',
    template: template,
    controller: controller,
    controllerAs: 'RootCtrl',
    url: '/',
    children: [
      appRoot
    ]
  })
}

/* @ngInject */
function run ($state, $rootScope, $window) {
  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault()
      $state.go(to.redirectTo, params, { location: 'replace' })
    }
  })
  // initialize facebook. This causes a whole host of problems
  // due to asynchronicity... fixed by the FB.getloginstatus.
  // we could do better by using $broadcast on $rootScope
  $window.fbAsyncInit = (function () {
    var FB = $window.FB

    FB.init({
      appId: '1156678381029883',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    })
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        $rootScope.$broadcast('fbLoggedIn', response)
        // facebookService.getProPic()
        //   .then(function(response) {
        //     $scope.propic = response.data.url
        //   })
        // facebookService.getFullName()
        //   .then(function(response) {
        //     $scope.fullName = response.name
        //   })
      }
    })
  })(function (d, s, id) {
    var js
    var fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))
}

services(app)
app.config(config)
app.run(run)
