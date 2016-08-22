import template from './tpl.html'
import controller from './ctrl.js'
import moment from 'moment'

export default {
  name: 'eat',
  url: '/eat',
  template: template,
  controller: controller,
  resolve: {
    /* @ngInject */
    meals: (APIService) => {
      // get meals from the beginning of today till eternity
      return APIService.getMeals(moment().startOf('day').toISOString(), 0)
    }
  },
  controllerAs: 'EatCtrl'
}
