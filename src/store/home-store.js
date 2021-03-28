import { fetchAction } from '@/util'
import { ref } from 'vue'

export default new class {
  data = ref({})

  @fetchAction
  fetchData() {
    return axios.get('contact/getCoinRank')
  }
}
