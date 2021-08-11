import { get } from 'lodash-es'

// 向 vue 实例挂载全局属性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $get: typeof get,
  }
}

export {}
