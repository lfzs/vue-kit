import { fetchAction } from '@/util'
import { Cache } from '@/store'
import { reactive } from 'vue'

export default class extends Cache {
  data = reactive({})

  @fetchAction
  fetchData() {
    return axios.get(`items/${this.id}`)
  }

}
