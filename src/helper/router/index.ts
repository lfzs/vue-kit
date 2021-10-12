import { createRouter as vueCreateRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { setForwardMetaBefore, setForwardMetaAfter } from './hook'
import { routes } from '@/routes'
import { IS_CLIENT } from '@/constant'

function createRouter() {
  const history = IS_CLIENT ? createWebHistory() : createMemoryHistory()
  const router = vueCreateRouter({ routes, history })

  router.beforeEach(to => {
    if (IS_CLIENT) {
      setForwardMetaBefore(to)
    }

    if (!to.matched.length) return '/404'
  })

  router.afterEach(to => {
    if (IS_CLIENT) {
      setForwardMetaAfter(to)
    }
  })

  return router
}

export {
  createRouter,
}
