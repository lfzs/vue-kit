import { get } from 'lodash'

// 向 vue 实例挂载全局属性
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $get: typeof get,
  }
}

export {}
