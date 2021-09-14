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
    path: '/signup',
    name: '注册页',
    component: () => import('@/view/signup')
  },
  {
    path: '/home',
    name: '主页',
    redirect: '/home/teacher',
    component: () => import('@/view/home'),
    children: [
      {
        path: 'teacher',
        name: '教师信息管理',
        component: () => import('@/view/teacher')
      },
      {
        path: 'parent',
        name: '家长需求管理',
        component: () => import('@/view/parent')
      },
      {
        path: 'matched-order',
        name: '已匹配订单',
        component: () => import('@/view/order/matched-order')
      },
      {
        path: 'pending-order',
        name: '待匹配订单',
        component: () => import('@/view/order/pending-order')
      },
      {
        path: 'home-teacher',
        name: '首页教师展示',
        component: () => import('@/view/interface/home-teacher')
      },
      {
        path: 'banner',
        name: 'banner设置',
        component: () => import('@/view/interface/banner')
      },
      {
        path: 'audit',
        name: '审核管理员注册',
        component: () => import('@/view/person/audit')
      },
      {
        path: 'check',
        name: '查看管理员信息',
        component: () => import('@/view/person/check')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
