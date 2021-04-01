import { computed, ref } from 'vue'
import Cache from './Cache'

export default class extends Cache {
  data = ref([])

  state = ref('pending')
  meta = ref({ total: 0, pageSize: 20 })

  api = ''
  param = {}

  status = computed(() => ({
    isNoMore: this.state.value === 'done' && this.data.value.length >= this.meta.value.total,
    isLoading: this.state.value === 'pending',
    isEmpty: this.state.value !== 'pending' && !this.data.value.length,
  }))

  canLoadmore = computed(() => (this.state.value === 'done') && (this.data.value.length < this.meta.value.total))

  setParam(param = {}) {
    this.param = { ...this.param, ...param }
  }

  async fetchData() {
    this.state.value = 'pending'
    try {
      const { data, meta } = await axios.get(this.api, { params: { offset: 1, pageSize: this.meta.value.pageSize, ...this.param } })
      this.data.value = data ?? this.data.value
      this.meta.value = meta ?? this.meta.value
      this.state.value = 'done'
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
      const { data, meta } = await axios.get(this.api, { params: { offset: this.data.value.length, pageSize: this.meta.value.pageSize, ...this.param } })
      this.data.value.push(...data)
      this.meta.value = meta
      this.state.value = 'done'
    } catch (error) {
      this.state.value = 'error'
      throw error
    }
  }

  findItemById(id) {
    return this.data.value.find(item => item.id === +id)
  }

  findIndexById(id) {
    return this.data.value.findIndex(item => item.id === +id)
  }

  removeItemById(id) {
    const index = this.findIndexById(id)
    if (index > -1) {
      this.data.value.splice(index, 1)
      this.meta.value.total -= 1
    }
  }

  replaceItem(newItem) {
    const index = this.data.value.findIndex(item => item.id === newItem.id)
    if (index > -1) this.data.value[index] = newItem
  }

  unshiftOrUpdate(newItem) {
    const index = this.data.value.findIndex(item => +item.id === +newItem.id)
    if (index > -1) {
      this.data.value[index] = newItem
    } else {
      this.data.value.unshift(newItem)
      this.meta.value.total += 1
    }
  }
}
