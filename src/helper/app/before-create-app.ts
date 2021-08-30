import * as local from '@/constant/local'
import { LOCAL_PREFIX, IS_SERVER } from '@/constant'
import { rootElementSetVhProperty, clearUselessLocalStorage } from '@/helper/common'

function beforeCreateApp() {
  if (!IS_SERVER) {
    rootElementSetVhProperty()
    const usedKeys = Object.values(local)
    setTimeout(() => clearUselessLocalStorage(LOCAL_PREFIX, usedKeys), 0)
  }
}

export {
  beforeCreateApp
}
