import { nextTick } from 'vue'
import type { Pinia } from 'pinia'

function initialState(store: Pinia) {
  if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__

    // 更新完成后，置空
    // 客户端可通过 __INITIAL_STATE__ 值判断是否是首次水合
    nextTick(() => window.__INITIAL_STATE__ = null)
  }
}

export {
  initialState,
}
