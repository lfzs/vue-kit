import { defineStore } from 'pinia'
import { axios } from '@/util'

const useHomeStore = defineStore('homeStore', {
  state() {
    return {
      data: [],
      name: 'home-store'
    }
  },

  actions: {
    async fetchData() {
      const { data } = await axios.get('football')
      this.data = data
    }
  },
})

export {
  useHomeStore,
}
