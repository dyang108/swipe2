import angular from 'angular'

// import 'lodash'
import 'angular-ui-router.statehelper'
import 'angular-ui-router'
import 'restangular'
import './css'
import appRoot from './app'
import template from './index.html'

var app = angular.module('app', [
  'ui.router',
  'ui.router.stateHelper',
  'restangular'
])

/* @ngInject */
function config (stateHelperProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)
  stateHelperProvider.state({
    name: 'index',
    template: template,
    url: '/',
    children: [
      appRoot
    ]
  })
}

/* @ngInject */
function run ($state, $rootScope) {
  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault()
      $state.go(to.redirectTo, params, {location: 'replace'})
    }
  })
}

app.config(config)
app.run(run)
