import { reactive } from 'vue'

const isRequired = () => {
  throw new Error('id is required')
}

export default class {
  static caches = new Map()

  static findOrCreate(id = isRequired()) {
    this.flag = this.flag || Math.random().toString(36).slice(2) // 向构造函数添加 flag 标志
    const key = `${this.flag}_${id}`

    if (!this.caches.has(key)) {
      const value = new this(id)
      value.id = id
      this.caches.set(key, reactive(value)) // 将 value 值变成响应式
    }

    return this.caches.get(key)
  }

  static remove(id) {
    if (this.flag && id) {
      const key = `${this.flag}_${id}`
      this.caches.has(key) && this.caches.delete(key)
    }
  }
}
