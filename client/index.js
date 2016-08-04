// var angular = require('angular')
import angular from 'angular'
import 'angular-ui-router.statehelper'
import 'angular-ui-router'
import './css'
import appRoot from './app'
import template from './index.html'

var app = angular.module('app', [
  'ui.router',
  'ui.router.stateHelper'
])

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

function run () {

}

app.config(config)
app.run(run)
