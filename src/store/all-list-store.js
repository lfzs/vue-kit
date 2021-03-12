import { List } from '@/store'
import { reactive } from 'vue'

export const itemListStore = reactive(new class extends List {
  api = 'items'
})
