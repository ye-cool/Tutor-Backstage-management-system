import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/view/login')
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('@/view/home')
  }
]

const router = new VueRouter({
  routes
})

export default router
