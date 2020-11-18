export default function(target, name, descriptor) { // target 为类的原型对象
  const { value } = descriptor
  if (typeof value !== 'function') throw new Error(`${name} is not a function`)

  target.tryFetchData = function(args) { return this._state === 'done' ? { data: this.data } : this.fetchData(args) } // 注意: 请求过，就返回已有的数据 data

  descriptor.value = async function(...args) {
    this._state = 'pending'
    try {
      const res = await value.apply(this, args)
      this._state = 'done'
      this.response = res // 返回值挂载到 this.response 上
      return this.data = res.data ?? this.data // 注意: this.data 指向 res.data
    } catch (error) {
      this._state = 'error'
      throw error
    }
  }
}
