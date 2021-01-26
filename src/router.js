import { createRouter, createWebHistory } from 'vue-router'
import { APP_NAME } from '@/constant'

const routes = [
  {
    path: '/',
    alias: ['/index', '/index.html'],
    component: () => import(/* webpackChunkName: "home" */ '@/view/home'),
    meta: {
      title: '首页',
      keepAlive: true
    },
  },
  {
    path: '/order',
    component: () => import(/* webpackChunkName: "order-layout" */ '@/view/order/layout'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "order-list" */ '@/view/order/list'),
        meta: {
          title: '订单',
        },
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "order-detail" */ '@/view/order/detail'),
        meta: {
          title: '订单信息',
        },
      },
    ],
  },
  {
    path: '/mine',
    component: () => import(/* webpackChunkName: "mine" */ '@/view/mine'),
    meta: {
      title: '我的',
    },
  },
  {
    path: '/signin',
    component: () => import(/* webpackChunkName: "signin" */ '@/view/signin'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/view/404'),
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL || '/'),
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? APP_NAME
  next()
})

export default router
