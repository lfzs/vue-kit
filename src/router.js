import Vue from 'vue'
import VueRouter from 'vue-router'
import { APP_NAME } from '@/constant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/view/home'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/order',
    component: () => import('@/view/order/layout'),
    children: [
      {
        path: '',
        component: () => import('@/view/order/list'),
        meta: {
          title: '订单',
        },
      },
      {
        path: 'detail',
        component: () => import('@/view/order/detail'),
        meta: {
          title: '订单信息',
        },
      },
    ],
  },
  {
    path: '/mine',
    component: () => import('@/view/mine'),
    meta: {
      title: '我的',
    },
  },
  {
    path: '/signin',
    component: () => import('@/view/signin'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    component: () => import('@/view/404'),
    meta: {
      title: '404',
    },
  },
  { path: '*', redirect: '/404' },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? APP_NAME
  next()
})

export default router
