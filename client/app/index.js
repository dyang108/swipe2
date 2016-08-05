import template from './tpl.html'
import controller from './ctrl.js'
import eat from './eat'
import post from './post'
import profile from './profile'

export default {
  name: 'main',
  url: 'main',
  template: template,
  controller: controller,
  children: [
    eat,
    post,
    profile
  ],
  controllerAs: 'AppCtrl',
  redirectTo: 'index.main.eat'
}
