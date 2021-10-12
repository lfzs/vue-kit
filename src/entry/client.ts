import { nextTick } from 'vue'
import { createApp } from '@/helper/app'
import {
  clearUselessLocalStorage,
  initialState,
  rootElementSetVhProperty,
} from './util'

rootElementSetVhProperty()
const { app, router, store } = createApp()

router.isReady().then(() => {
  initialState(store)
  app.mount('body')
  nextTick(() => clearUselessLocalStorage())
})
