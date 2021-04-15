import { ref, nextTick } from 'vue'

// 控制刷新当前路由页面
export const currentRoute = ref(true)
export function refreshCurrentRoute() {
  currentRoute.value = false
  nextTick(() => currentRoute.value = true)
}
