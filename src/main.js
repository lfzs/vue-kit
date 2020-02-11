import '@/component/register-component'
import '@/component-element-ui'
import '@/util/sentry'

import Vue from 'vue'
import router from '@/router'
import { axios } from '@/util'
import dayjs from 'dayjs'
import app from '@/app'

window.axios = axios
window.dayjs = dayjs

new Vue({
  el: '#app',
  router,
  render: h => h(app),
})
