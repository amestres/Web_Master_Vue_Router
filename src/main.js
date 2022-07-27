import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSimpleAlert from 'vue-simple-alert'
import ToggleButton from 'vue-js-toggle-button'
import SweetAlertIcons from 'vue-sweetalert-icons'

Vue.config.productionTip = false
Vue.use(VueSimpleAlert)
Vue.use(ToggleButton)
Vue.use(SweetAlertIcons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
