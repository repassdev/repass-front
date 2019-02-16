import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import router from './router';

Vue.config.productionTip = false

Vue.filter('real', function (value) {
  if (!value) {
    return ''
  } else {
    value = value.toString();
    return 'R$ ' + value;
  }
})

Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
