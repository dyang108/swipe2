var template = require('./tpl.html')
var controller = require('./ctrl.js')

module.exports = {
  name: 'eat',
  url: '/eat',
  template: template,
  controller: controller,
  controllerAs: 'EatCtrl'
}
