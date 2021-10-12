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
    name: 'Superadmin',
    redirect: '/Superadmin/teacher',
    component: () => import('@/view/Superadmin'),
    children: [
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('@/view/teacher')
      },
      {
        path: 'parent',
        name: 'teacher',
        component: () => import('@/view/parent')
      },
      {
        path: 'matched-order',
        name: 'matched-order',
        component: () => import('@/view/order/matched-order')
      },
      {
        path: 'pending-order',
        name: 'pending-order',
        component: () => import('@/view/order/pending-order')
      },
      {
        path: 'admin-teacher',
        name: 'admin-teacher',
        component: () => import('@/view/interface/admin-teacher')
      },
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/view/interface/banner')
      },
      {
        path: 'audit',
        name: 'audit',
        component: () => import('@/view/person/audit')
      },
      {
        path: 'check',
        name: 'check',
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
  if (to.path === '/login'||to.path === '/signup') {
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
