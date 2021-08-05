import { isNil } from 'lodash-es'

// // 装饰实例类的 fetchData 方法，讲返回值赋值到 data
function fetchAction(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  if (typeof descriptor.value !== 'function') {
    throw new Error(`${propertyKey} is not a function`)
  }

  // 重写该方法
  Object.defineProperty(target, propertyKey, {
    ...descriptor,
    value: async function(...args: any[]) {
      this._state = 'pending'

      try {
        let res = await descriptor.value.apply(this, args)
        this._state = 'done'
        res = res.data ?? res // 注意: 优先拿 res.data

        if (isNil(res)) return this.data

        // 返回值 如果是 Array 和 Object，this.data 需要提前声明为 reactive， 其他值声明为 ref
        if (Array.isArray(res)) {
          this.data.length = 0
          this.data.push(...res)
        } else if (typeof res === 'object') {
          Object.assign(this.data, ...res)
        } else {
          this.data.value = res
        }

        return this.data
      } catch (error) {
        this._state = 'error'
        throw error
      }
    },
  })

  // 原型添加 tryFetchData 方法
  Object.defineProperty(target, 'tryFetchData', {
    enumerable: false,
    value: function(...args: any[]) {
      return this._state === 'done' ? this.data : this.fetchData(...args) // 注意: 请求过，就返回已有的数据 data,
    },
  })
}

export {
  fetchAction,
}
