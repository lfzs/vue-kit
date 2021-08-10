const isRequired = () => {
  throw new Error('id is required')
}

const caches = new Map()

class Cache {
  static flag: string

  static findOrCreate(id: string = isRequired()) {
    // 向子类构造函数添加 flag 标志
    this.flag = this.flag || Math.random().toString(36).slice(2)
    const key = `${this.flag}_${id}`

    if (!caches.has(key)) {
      const value = new this()
      caches.set(key, value)
    }

    return caches.get(key)
  }

  static remove(id: string) {
    if (this.flag && id) {
      const key = `${this.flag}_${id}`
      caches.has(key) && caches.delete(key)
    }
  }
}

export {
  Cache
}
