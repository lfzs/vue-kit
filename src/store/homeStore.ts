import { fetchAction } from '@/helper/common'
import { axios } from '@/helper/axios'
import { reactive } from 'vue'

class HomeStore {
  data = reactive({})

  @fetchAction
  fetchData() {
    return axios.get('v2/match/football')
  }
}

const homeStore = new HomeStore()
export {
  homeStore,
}
