import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.less'
import { Button, Form, Input, Select, List, Tabs, Icon } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(List)
Vue.use(Tabs)
Vue.use(Icon)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
