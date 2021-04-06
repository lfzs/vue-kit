import { computed, reactive, ref } from 'vue'
import Cache from './Cache'
import _ from 'lodash'

export default class extends Cache {
  data = reactive([])

  state = ref('pending')
  meta = reactive({ total: 0, pageSize: 20 })

  api = ''
  param = {}

  status = computed(() => ({
    isNoMore: this.state.value === 'done' && this.data.length >= this.meta.total,
    isLoading: this.state.value === 'pending',
    isEmpty: this.state.value !== 'pending' && !this.data.length,
  }))

  canLoadmore = computed(() => (this.state.value === 'done') && (this.data.length < this.meta.total))

  setParam(param = {}) {
    this.param = { ...this.param, ...param }
  }

  async fetchData() {
    this.state.value = 'pending'
    try {
      const { data, meta } = await axios.get(this.api, { params: { offset: 1, pageSize: this.meta.pageSize, ...this.param } })
      this.state.value = 'done'
      if (_.isNil(data)) return
      this.data.length = 0 // 清空数组
      this.data.push(...data)
      Object.assign(this.meta, ...meta)
    } catch (error) {
      this.state.value = 'error'
      throw error
    }
  }

  tryFetchData() {
    return this.state.value !== 'done' && this.fetchData()
  }

  async fetchMoreData() {
    if (this.state.value === 'pending') return
    if (!this.canLoadmore.value) return

    this.state.value = 'pending'
    try {
      const { data, meta } = await axios.get(this.api, { params: { offset: this.data.length, pageSize: this.meta.pageSize, ...this.param } })
      this.state.value = 'done'
      if (_.isNil(data)) return
      this.data.push(...data)
      Object.assign(this.meta, ...meta)
    } catch (error) {
      this.state.value = 'error'
      throw error
    }
  }

  findItemById(id) {
    return this.data.find(item => item.id === +id)
  }

  findIndexById(id) {
    return this.data.findIndex(item => item.id === +id)
  }

  removeItemById(id) {
    const index = this.findIndexById(id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.meta.total -= 1
    }
  }

  replaceItem(newItem) {
    const index = this.data.findIndex(item => item.id === newItem.id)
    if (index > -1) this.data[index] = newItem
  }

  unshiftOrUpdate(newItem) {
    const index = this.data.findIndex(item => +item.id === +newItem.id)
    if (index > -1) {
      this.data[index] = newItem
    } else {
      this.data.unshift(newItem)
      this.meta.total += 1
    }
  }
}
