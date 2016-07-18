var template = require('./tpl.html')
var controller = require('./ctrl.js')
var eat = require('./eat')
var post = require('./post')
var profile = require('./profile')

module.exports = {
  name: 'main',
  url: 'main',
  template: template,
  controller: controller,
  children: [
    eat,
    post,
    profile
  ],
  controllerAs: 'AppCtrl'
}
