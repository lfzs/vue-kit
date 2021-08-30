import { computed, reactive, ref } from 'vue'
import { Cache } from '@/store'
import { isNil } from 'lodash'
import { axios } from '@/helper/axios'
import { RequestResponseData } from 'axios'

interface Item {
  id: number,
  [props: string]: unknown,
}

interface CustomParam {
  [props: string]: unknown,
}

abstract class List extends Cache {
  data = reactive<Item[]>([])

  state = ref('pending')
  meta = reactive({
    total: 0,
    pageSize: 20,
  })

  abstract api: string
  customParam!: CustomParam

  status = computed(() => ({
    canLoadMore: this.state.value === 'done' && this.data.length < this.meta.total,
    isNoMore: this.state.value === 'done' && this.data.length >= this.meta.total,
    isLoading: this.state.value === 'pending',
    isEmpty: this.state.value !== 'pending' && !this.data.length,
  }))

  setCustomParam(param = {}) {
    this.customParam = { ...this.customParam, ...param }
  }

  private getParam() {
    return {
      offset: this.data.length,
      pageSize: this.meta.pageSize,
      ...this.customParam,
    }
  }

  async fetchData() {
    this.state.value = 'pending'

    try {
      const { data: { data, meta } } = await axios.get<RequestResponseData<Item[]>>(this.api, { params: this.getParam() })
      this.state.value = 'done'
      if (isNil(data)) return
      this.data.length = 0 // 清空数组
      this.data.push(...data)
      Object.assign(this.meta, meta)
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
    if (!this.status.value.canLoadMore) return

    this.state.value = 'pending'
    try {
      const { data: { data, meta } } = await axios.get<RequestResponseData<Item[]>>(this.api, { params: this.getParam() })
      this.state.value = 'done'
      if (isNil(data)) return
      this.data.push(...data)
      Object.assign(this.meta, meta)
    } catch (error) {
      this.state.value = 'error'
      throw error
    }
  }

  findItemById(id: number) {
    return this.data.find(item => item.id === +id)
  }

  findIndexById(id: number) {
    return this.data.findIndex(item => item.id === +id)
  }

  removeItemById(id: number) {
    const index = this.findIndexById(id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.meta.total -= 1
    }
  }

  replaceItem(newItem: Item) {
    const index = this.data.findIndex(item => item.id === newItem.id)
    if (index > -1) this.data[index] = newItem
  }

  unshiftOrUpdate(newItem: Item) {
    const index = this.data.findIndex(item => +item.id === +newItem.id)
    if (index > -1) {
      this.data[index] = newItem
    } else {
      this.data.unshift(newItem)
      this.meta.total += 1
    }
  }
}

export {
  List
}
