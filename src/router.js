import { createRouter, createWebHistory } from 'vue-router'
import { APP_NAME } from '@/constant'
import { beforeRoute, afterRoute } from '@/util/route-forward'

import { h } from 'vue'

const routes = [
  {
    path: '/',
    alias: ['/index'],
    component: () => import('@/view/home'),
    meta: {
      title: 'home',
      keepAlive: true,
      suspense: true,
    },
  },
  {
    path: '/item/:id',
    component: () => import('@/view/item'),
    children: [
      {
        path: '',
        component: { render: () => h('h3', 'item content') },
      },
      {
        path: 'status',
        component: { render: () => h('h3', 'status content') },
      },
    ],
  },
  { path: '/signin', component: { render: () => h('h3', 'sign in page') } },
  { path: '/404', component: { render: () => h('h3', '404') } },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach((to, from) => {
  document.title = to.meta.title ?? APP_NAME
  beforeRoute(to, from)
  if (!to.matched.length) return '/404'
})

router.afterEach((to, from) => {
  afterRoute(to, from)
})

export default router
