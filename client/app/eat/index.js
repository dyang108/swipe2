import template from './tpl.html'
import controller from './ctrl.js'

export default {
  name: 'eat',
  url: '/eat',
  template: template,
  controller: controller,
  resolve: {
    /* @ngInject */
    meals: (Restangular) => {
      Restangular.all('meals')
    }
  },
  controllerAs: 'EatCtrl'
}
