import { isNil } from 'lodash-es'

// 装饰实例类的 fetchData 方法，将返回值赋值到 data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchAction(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value

  if (typeof original !== 'function') {
    throw new Error(`${propertyKey} is not a function`)
  }

  // 重写该方法
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = async function(this: any, ...args: any[]) {
    this._state = 'pending'

    try {
      const { data: { data } } = await original.apply(this, args)
      this._state = 'done'

      if (isNil(data)) return this.data

      // 返回值 如果是 Array 和 Object，this.data 需要提前声明为 reactive， 其他值声明为 ref
      if (Array.isArray(data)) {
        this.data.length = 0
        this.data.push(...data)
      } else if (typeof data === 'object') {
        Object.assign(this.data, data)
      } else {
        this.data.value = data
      }

      return this.data
    } catch (error) {
      this._state = 'error'
      throw error
    }
  }

  // 原型添加 tryFetchData 方法
  Object.defineProperty(target, 'tryFetchData', {
    enumerable: false,
    value: function(...args: any[]) {
      // 请求过，就返回已有的数据 data
      return this._state === 'done' ? this.data : this.fetchData(...args)
    },
  })

  return descriptor
}

export {
  fetchAction,
}
