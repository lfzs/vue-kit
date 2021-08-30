import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 解构 route 中的 params query hash meta
function useRouteParam() {
  const route = useRoute()
  return computed(() => ({
    ...route.params,
    ...route.query,
    hash: route.hash.slice(1),
    ...route.meta,
  }))
}

export {
  useRouteParam,
}
