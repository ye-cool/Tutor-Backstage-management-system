import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import axios from 'axios'
import api from './api'
import { message } from 'ant-design-vue'

// Vue.use(VueAxios)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.$api = api
Vue.prototype.$message = message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
