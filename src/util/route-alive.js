const stack = [] // 路由栈
const routeHistory = new Set() // 全部路由历史
let currentHistoryState = {}

export function beforeRouteAlive(to, from) {
  const target = stack.find(item => item.fullPath === to.fullPath)
  const forward = !target || target.position > currentHistoryState.position
  to.meta.forward = forward

  if (forward) {
    from.meta.keepAlive = true
    !routeHistory.has(to.fullPath) && (to.meta.keepAlive = true) // 第一次访问缓存，其他都不缓存
  } else {
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }
}

export function afterRouteAlive(to) {
  const { position } = history.state
  const index = stack.findIndex(item => item.position === position)
  currentHistoryState = { ...history.state, fullPath: to.fullPath }
  if (index > -1) {
    const newRoute = !stack.some(item => item.fullPath === to.fullPath)
    newRoute && stack.splice(index + 1) // 新路由删除后面的路由
    stack[index] = currentHistoryState
  } else {
    stack.push(currentHistoryState)
  }

  routeHistory.add(to.fullPath)
}

