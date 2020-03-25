import { fetchAction } from '@/util'
import { Cache } from '@/store'

export default class ItemDetailStore extends Cache {

  @fetchAction
  fetchData() {
    return axios.get(`items/${this.id}`)
  }

}
