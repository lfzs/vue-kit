import { fetchAction } from '@/util/common'
import { axios } from '@/util/axios'
import { reactive } from 'vue'
class HomeStore {
  data = reactive({})

  @fetchAction
  fetchData() {
    return axios.get('v2/change/basketball')
  }
}

const homeStore = new HomeStore()
export {
  homeStore,
}
