import '@/component'
import '@/component-element-ui'
import '@/util/sentry'

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import router from '@/router'
import app from '@/app'

import { axios } from '@/util'
import dayjs from 'dayjs'
import Big from 'big.js'

Vue.use(VueLazyload)

window.axios = axios
window.dayjs = dayjs
window.Big = Big

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(app),
})
