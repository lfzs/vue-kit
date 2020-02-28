import '@/component/register-component'
import '@/component-element-ui'
import '@/util/sentry'

import Vue from 'vue'
import router from '@/router'
import { axios } from '@/util'
import dayjs from 'dayjs'
import Big from 'big.js'
import app from '@/app'

window.axios = axios
window.dayjs = dayjs
window.Big = Big

new Vue({
  el: '#app',
  router,
  render: h => h(app),
})
