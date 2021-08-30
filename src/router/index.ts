import { createRouter as vueCreateRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { setDocumentTitle, setForwardMetaBefore, setForwardMetaAfter } from '@/helper/router'
import { routes } from './routes'
const isServer = typeof window === 'undefined'

function createRouter() {
  const history = isServer ? createMemoryHistory() : createWebHistory()
  const router = vueCreateRouter({ routes, history })

  router.beforeEach(to => {
    if (!isServer) {
      setDocumentTitle(to)
    }
    setForwardMetaBefore(to)
    if (!to.matched.length) return '/404'
  })

  router.afterEach(to => {
    setForwardMetaAfter(to)
  })

  return router
}

export {
  createRouter,
}
