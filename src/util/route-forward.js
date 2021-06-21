const stack = []

export function beforeRoute(to) {
  to.meta.forward = !stack.find(item => item.fullPath === to.fullPath)
}

export function afterRoute(to) {
  if (to.meta.forward) {
    stack.push(to)
  } else {
    const index = stack.findIndex(item => item.fullPath === to.fullPath)
    stack.splice(index + 1)
  }
}
