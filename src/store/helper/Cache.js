const isRequired = () => {
  throw new Error('id is required')
}

export default class {
  static caches = Object.create(null)

  static findOrCreate(id = isRequired()) {
    this.flag = this.flag || Math.random().toString(36).slice(2) // 向构造函数添加 flag 标志

    const key = `${this.flag}_${id}`
    let value = this.caches[key]

    if (!value) {
      value = new this(id)
      value.id = id
      this.caches[key] = value
    }

    return this.caches[key]
  }

  static remove(id) {
    if (this.flag && id) {
      const key = `${this.flag}_${id}`
      const value = this.caches[key]
      value && delete this.caches[key]
    }
  }
}
