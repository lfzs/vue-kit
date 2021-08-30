import type { App } from 'vue'
import { setGlobalProperties } from '@/helper/common'
import { registerBaseComponent } from '@/component/base'
import { registerElementComponent } from '@/component/element'

function afterCreateApp(app: App) {
  // 向 app 挂载全局属性
  setGlobalProperties(app)

  // 全局注册组件
  registerBaseComponent(app)
  registerElementComponent(app)
}

export {
  afterCreateApp,
}
