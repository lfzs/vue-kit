// 全局注册当前文件下的组件(注意：只匹配 base-*.vue 命名的组件，其他命名方式不会注册)
// https://webpack.js.org/guides/dependency-management/#requirecontext
import type { App } from 'vue'

function registerBaseComponent(app: App) {
  // require.context 需要 @types/webpack-env 的支持
  const requireComponent = require.context('@/component/base/', false, /base-[\w-]+\.vue$/)
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    app.component(componentName, componentConfig.default || componentConfig)
  })
}

export {
  registerBaseComponent,
}
