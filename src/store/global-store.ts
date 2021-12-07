import { defineStore } from 'pinia'

const useGlobalStore = defineStore('globalStore', {
  state() {
    return {
      routerKey: 0,
    }
  },

  actions: {
    incRouterKey() {
      this.routerKey += 1
    },
  },
})

export {
  useGlobalStore,
}
