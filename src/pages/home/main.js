import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as api from '@/api/api'

Vue.config.productionTip = false

Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
