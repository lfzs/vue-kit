import * as local from '@/constant/local'
import { LOCAL_PREFIX } from '@/constant'
import { rootElementSetVhProperty, clearUselessLocalStorage } from '@/helper/common'

function beforeCreateApp() {
  if (process.env.browser) {
    rootElementSetVhProperty()
    const usedKeys = Object.values(local)
    setTimeout(() => clearUselessLocalStorage(LOCAL_PREFIX, usedKeys), 0)
  }
}

export {
  beforeCreateApp
}
