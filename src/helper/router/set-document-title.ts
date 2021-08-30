import type { RouteLocationNormalized } from 'vue-router'
import { APP_NAME } from '@/constant'

function setDocumentTitle(to: RouteLocationNormalized) {
  document.title = to.meta.title ?? APP_NAME
}

export {
  setDocumentTitle,
}
