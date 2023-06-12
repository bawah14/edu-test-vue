import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'tailwindcss/tailwind.css'
import './styles/global.css'

axios.defaults.baseURL = process.env.VUE_APP_BASE_PATH
Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
