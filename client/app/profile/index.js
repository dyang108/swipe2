var template = require('./tpl.html')
var controller = require('./ctrl.js')

module.exports = {
  name: 'profile',
  url: '/profile',
  template: template,
  controller: controller,
  controllerAs: 'ProfileCtrl'
}
