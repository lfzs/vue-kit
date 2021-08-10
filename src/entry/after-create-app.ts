import { App } from 'vue'
import { router } from '@/router'
import { setGlobalProperties } from '@/util/common'
import { registerBaseComponent } from '@/component/base'
import { registerElementComponent } from '@/component/element'

export function afterCreateApp(app: App) {
  // 路由注册
  app.use(router)

  // 向 app 挂载全局属性
  setGlobalProperties(app)

  // 全局注册组件
  registerBaseComponent(app)
  registerElementComponent(app)

  // 路由挂载
  router.isReady().then(() => app.mount('body'))
}
