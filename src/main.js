import 'es6-promise/auto' // 一些第三方包会依赖 Promise 环境

import '@/component/base-component' // 组件全局注册
import '@/component/element-ui' // element 组件全局注册
import '@/util/sentry'

// 全局样式
import 'normalize.css'
import '@/style/app.less'

import { axios } from '@/util'
window.axios = axios

import Vue from 'vue'
Vue.config.productionTip = false

import _ from 'lodash'
Vue.prototype.$get = _.get

import { formatTime } from '@/filter'
Vue.filter('formatTime', formatTime)

// 根元素添加 --vh 变量
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`))

import router from '@/router'
import app from '@/app'
new Vue({ name: 'app', el: '#app', router, render: h => h(app) })
