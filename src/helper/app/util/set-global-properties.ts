// 向 vue 实例挂载全局属性
import type { App } from 'vue'
import { get } from 'lodash'

function setGlobalProperties(app: App) {
  app.config.globalProperties.$get = get
}

export {
  setGlobalProperties,
}
