import { fetchAction } from '@/util'
import { Cache } from '@/store'
import { ref } from 'vue'

export default class extends Cache {
  data = ref({})

  @fetchAction
  fetchData() {
    return axios.get(`items/${this.id}`)
  }

}
