import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import 'normalize.css'
import './assets/font/iconfont.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:require('./assets/images/loading.gif')
})

Vue.prototype.http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
