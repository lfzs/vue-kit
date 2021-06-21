import _ from 'lodash'

export default function fetchAction(target, name, descriptor) { // target 为类的原型对象
  const { value } = descriptor
  if (typeof value !== 'function') throw new Error(`${name} is not a function`)

  // 原型添加 tryFetchData 方法
  Object.defineProperty(target, 'tryFetchData', {
    enumerable: false,
    value: function(...args) { return this._state === 'done' ? this.data : this.fetchData(...args) }, // 注意: 请求过，就返回已有的数据 data,
  })

  descriptor.value = async function(...args) {
    this._state = 'pending'
    try {
      let res = await value.apply(this, args)
      this._state = 'done'
      res = res.data ?? res // 注意: 优先拿 res.data
      if (_.isNil(res)) return

      // 返回值 如果是 Array 和 Object，this.data 需要声明为 reactive， 其他值声明为 ref
      if (Array.isArray(res)) {
        this.data.length = 0
        this.data.push(...res)
      } else if (typeof res === 'object') Object.assign(this.data, ...res) // null or {}
      else this.data.value = res
    } catch (error) {
      this._state = 'error'
      throw error
    }
  }
}
