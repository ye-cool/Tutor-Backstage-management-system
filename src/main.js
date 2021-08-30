import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import { Button, Form, Input, Select, List, Spin, Tabs, Icon, Row, Col, Tooltip, Cascader, Radio, Slider, Switch, Upload, AutoComplete, Checkbox, Modal, Layout, Menu, Space, Dropdown, Table, PageHeader, Popover, DatePicker, TimePicker } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(List)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Cascader)
Vue.use(AutoComplete)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Modal)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Space)
Vue.use(Table)
Vue.use(PageHeader)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(Spin)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Upload)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
