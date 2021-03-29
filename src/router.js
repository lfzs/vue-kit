import { createRouter, createWebHistory } from 'vue-router'
import { APP_NAME } from '@/constant'
import { h } from 'vue'

const routes = [
  {
    path: '/',
    alias: ['/index', '/index.html'],
    component: () => import('@/view/home'),
    meta: {
      title: 'home',
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
