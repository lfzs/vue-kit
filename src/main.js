import 'es6-promise/auto' // 一些第三方包会依赖 Promise 环境

import '@/component/base-component' // 组件全局注册
import '@/component/element-ui' // element 组件全局注册
import '@/util/sentry'

import { axios } from '@/util'
window.axios = axios

import Vue from 'vue'
Vue.config.productionTip = false

import _ from 'lodash'
Vue.prototype.$get = _.get

import { formatTime } from '@/filter'
Vue.filter('formatTime', formatTime)

import router from '@/router'
import app from '@/app'
new Vue({ el: '#app', router, render: h => h(app) })
