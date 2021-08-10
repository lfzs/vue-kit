import { fetchAction } from '@/util/common'
import { Cache } from '@/store'
import { reactive } from 'vue'
import { axios } from '@/util/axios'

class ItemDetailStore extends Cache {
  data = reactive({})

  @fetchAction
  fetchData(id: number) {
    return axios.get(`items/${id}`)
  }

}

export {
  ItemDetailStore
}
