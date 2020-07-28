import '@/component' // 组件全局注册
import '@/component/element-ui' // element 组件全局注册
import '@/util/sentry'

import { axios } from '@/util'
import dayjs from 'dayjs'
import Big from 'big.js'
window.axios = axios
window.dayjs = dayjs
window.Big = Big

import Vue from 'vue'
Vue.config.productionTip = false

import { formatTime } from '@/filter'
Vue.filter('formatTime', formatTime)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import router from '@/router'
import app from '@/app'
new Vue({ el: '#app', router, render: h => h(app) })
