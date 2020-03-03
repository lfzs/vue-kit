// 自动全局注册 src/component 文件下的组件 => 在入口处导入此文件即可
// https://cn.vuejs.org/v2/guide/components-registration.html#基础组件的自动化全局注册
import Vue from 'vue'

const requireComponent = require.context('.', false, /base-[\w-]+\.vue$/) // 注意：只匹配 base-*.vue 命名的组件
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})
