// ie11 未提供 Promise 环境 (一些第三方包会依赖 Promise 环境)
// 如 axios https://github.com/axios/axios/blob/c4300a88cf994b9c4b88b065806edb98705a2c5d/README.md#promises
// 如 vuex https://github.com/vuejs/vuex/blob/7cb99525765d63e49a8dba7a083064806d54a230/docs/installation.md#promise
import 'es6-promise/auto'

import '@/component/base-component' // 组件全局注册
import '@/component/element-ui' // element 组件全局注册
import '@/util/sentry'

import { axios } from '@/util'
window.axios = axios

import Vue from 'vue'
Vue.config.productionTip = false

import { formatTime } from '@/filter'
Vue.filter('formatTime', formatTime)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import router from '@/router'
import app from '@/app'
new Vue({ el: '#app', router, render: h => h(app) })
