import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { setForwardMetaBefore, setForwardMetaAfter } from './meta-forward'
import { setDocumentTitle } from './before'

const router = createRouter({
  routes,
  history: createWebHistory('/'),
})

router.beforeEach((to) => {
  setDocumentTitle(to)
  setForwardMetaBefore(to)

  if (!to.matched.length) return '/404'
})

router.afterEach(to => {
  setForwardMetaAfter(to)
})

export {
  router,
}
