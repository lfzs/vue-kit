import 'es6-promise/auto'
import 'normalize.css'
import '@/style/var-class/index.less'
import '@/style/icon-class.less'
import '@/style/reset.less'

import { createSSRApp, createApp as createCSRApp } from 'vue'
import Root from '@/root.vue'
import { createRouter } from '@/router'
import { beforeCreateApp } from '@/helper/app/before-create-app'
import { afterCreateApp } from '@/helper/app/after-create-app'
const isSSR = process.env.SSR

function createApp() {
  beforeCreateApp()
  const app = isSSR ? createSSRApp(Root) : createCSRApp(Root)
  const router = createRouter()
  app.use(afterCreateApp).use(router)
  return { app, router }
}

export {
  createApp
}
