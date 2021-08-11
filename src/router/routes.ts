import type { RouteRecordRaw } from 'vue-router'
import { h } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: ['/index'],
    component: () => import('@/view/home.vue'),
    meta: {
      title: 'home',
      keepAlive: true,
      suspense: true,
    },
  },
  {
    path: '/item/:id',
    component: () => import('@/view/item.vue'),
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
  {
    path: '/signin',
    component: { render: () => h('h3', 'sign in page') },
  },
  {
    path: '/404',
    component: { render: () => h('h3', '404') },
  },
]

export {
  routes,
}
