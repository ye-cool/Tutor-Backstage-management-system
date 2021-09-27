import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
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
    path: '/Superadmin',
    name: '主页',
    redirect: '/Superadmin/teacher',
    component: () => import('@/view/Superadmin'),
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
        path: 'admin-teacher',
        name: '首页教师展示',
        component: () => import('@/view/interface/admin-teacher')
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
  },
  {
    path: '/admin',
    name: '主页',
    redirect: '/admin/teacher',
    component: () => import('@/view/admin'),
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
        path: 'admin-teacher',
        name: '首页教师展示',
        component: () => import('@/view/interface/admin-teacher')
      },
      {
        path: 'banner',
        name: 'banner设置',
        component: () => import('@/view/interface/banner')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由权限守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    // let roles = localStorage.getItem('roles');
    if (token === null || token === '') {
      next('/login');
    }
    // else if(roles == 0 ){
    //   next('/Superadmin');
    // }
     else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router
