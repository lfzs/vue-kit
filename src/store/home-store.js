import { fetchAction } from '@/util'
import { reactive } from 'vue'

export default new class {
  data = reactive([])

  @fetchAction
  fetchData() {
    return axios.get('contact/getCoinRank')
  }
}
