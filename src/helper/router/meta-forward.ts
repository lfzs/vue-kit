import type { RouteLocationNormalized } from 'vue-router'

const stack: RouteLocationNormalized[] = []

function setForwardMetaBefore(to: RouteLocationNormalized) {
  to.meta.forward = !stack.find(item => item.fullPath === to.fullPath)
}

function setForwardMetaAfter(to: RouteLocationNormalized) {
  if (to.meta.forward) {
    stack.push(to)
  } else {
    const index = stack.findIndex(item => item.fullPath === to.fullPath)
    stack.splice(index + 1)
  }
}

export {
  setForwardMetaBefore,
  setForwardMetaAfter,
}
