import type { RouteLocationNormalized } from 'vue-router'
import { APP_NAME } from '@/constant'

export function setDocumentTitle(to: RouteLocationNormalized) {
  document.title = to.meta.title ?? APP_NAME
}
