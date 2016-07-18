var angular = require('angular')

require('angular-ui-router.statehelper')
require('angular-ui-router')
require('./css')
var appRoot = require('./app')
var template = require('./index.html')

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
