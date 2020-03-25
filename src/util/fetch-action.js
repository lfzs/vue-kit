export default function(target, name, descriptor) { // target 为类的原型对象
  const { value } = descriptor
  if (typeof value !== 'function') throw new Error(`${name} is not a function`)

  target.tryFetchData = function() { return this._state !== 'done' && this.fetchData() }

  descriptor.value = async function(...args) {
    this._state = 'pending'
    try {
      const res = await value.apply(this, args)
      this._state = 'done'
      return this.data = res.data || res // 会把 返回值 赋值到 data 上
    } catch (error) {
      this._state = 'error'
      throw error
    }
  }
}
