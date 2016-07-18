var template = require('./tpl.html')
var controller = require('./ctrl.js')

module.exports = {
  name: 'post',
  url: '/post',
  template: template,
  controller: controller,
  controllerAs: 'PostCtrl'
}
