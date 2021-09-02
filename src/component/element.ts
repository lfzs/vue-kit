// element-ui 组件按需加载, 需要手动添加
import type { App } from 'vue'

import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,

  ElButton,
  ElDivider,
} from 'element-plus'

// 导入自定义变量
import '@/style/var-element.scss'

const components = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,

  ElButton,
  ElDivider,
]

function registerElementComponent(app: App) {
  components.forEach(component => app.use(component))
}

export {
  registerElementComponent,
}
