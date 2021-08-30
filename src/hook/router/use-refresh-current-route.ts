import { ref, nextTick } from 'vue'

// 路由重载
function useRefreshCurrentRoute() {
  const active = ref(true)

  const refreshCurrentRoute = () => {
    active.value = false
    nextTick(() => active.value = true)
  }

  return {
    active,
    refreshCurrentRoute
  }
}

export {
  useRefreshCurrentRoute
}
