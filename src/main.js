import Vue from 'vue'
import App from './App.vue'
import router  from './config/router'
import { BootstrapVue } from 'bootstrap-vue'
import { TablePlugin } from 'bootstrap-vue'
import { AlertPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

Vue.use(AlertPlugin)
Vue.use(TablePlugin)
Vue.use(BootstrapVue)
Vue.use(router)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
