import 'es6-promise/auto' // 一些第三方包会依赖 Promise 环境

// 全局样式
import 'normalize.css'
import '@/style/reset.less'
import '@/style/var-class.less'

// 根元素添加 --vh 变量
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`))

import { axios } from '@/util'
window.axios = axios

import { createApp } from 'vue'
import App from '@/app'
const app = createApp(App)

import _ from 'lodash'
app.config.globalProperties.$get = _.get // 挂载全局变量

import elementPlus from '@/component/element-plus'
elementPlus(app) // element 组件全局注册
import '@/style/var-element.scss' // 覆盖样式

import registerBaseComponent from '@/component/base'
registerBaseComponent(app) // base-* 组件全局注册

import router from '@/router'
app.use(router) // 路由注册
router.isReady().then(() => app.mount('#app'))
