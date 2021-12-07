import 'normalize.css'
import '@/style/var-class/index.less'
import '@/style/icon-class.less'
import '@/style/reset.less'

import { createSSRApp, createApp as createCSRApp } from 'vue'
import Root from '@/root.vue'
import { registerBaseComponent, setGlobalProperties } from './util'
import { createRouter } from '@/helper/router'
import { createStore } from '@/helper/store'
import { createHead } from '@vueuse/head'

function createApp() {
  const app = __SSR_ENV__ ? createSSRApp(Root) : createCSRApp(Root)
  const router = createRouter()
  const store = createStore()
  const head = createHead()
  app
    .use(registerBaseComponent)
    .use(setGlobalProperties)
    .use(router)
    .use(store)
    .use(head)
  return { app, router, store, head }
}

export {
  createApp
}
