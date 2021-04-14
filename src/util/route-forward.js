// 根据 history.state 判断页面是前进还是后退

const stack = [] // 路由栈
let currentHistoryState = {} // beforeEach 前 history.state 已经更新了，所以需要使用手动记录

export function beforeRoute(to) {
  const target = stack.find(item => item.fullPath === to.fullPath)
  const forward = !target || target.position > currentHistoryState.position
  to.meta.forward = forward
}

export function afterRoute(to) {
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
}
