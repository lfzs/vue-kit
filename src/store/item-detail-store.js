import { fetchAction } from '@/util'
import { Cache } from '@/store'

export default class extends Cache {

  @fetchAction
  fetchData() {
    return axios.get(`items/${this.id}`)
  }

}
