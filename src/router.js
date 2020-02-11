import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/view/home') },
  {
    path: '/order',
    component: () => import('@/view/order/layout'),
    children: [
      { path: '', component: () => import('@/view/order/list') },
      { path: 'detail', component: () => import('@/view/order/detail') },
    ],
  },
  { path: '/mine', component: () => import('@/view/mine') },
  { path: '/signin', component: () => import('@/view/signin') },
  { path: '/404', component: () => import('@/view/404') },
  { path: '*', redirect: '/404' },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
