// element-ui 组件按需加载, 需要手动添加
import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,

  ElButton,
  ElDivider
} from 'element-plus'

const components = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,

  ElButton,
  ElDivider,
]

export default function(app) {
  components.forEach(component => app.use(component))
}
