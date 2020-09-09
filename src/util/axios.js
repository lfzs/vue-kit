import axios from 'axios'
import { getErrorMessage } from '@/util'
import { host } from '@/env'
import router from '@/router'
import { authStore } from '@/store'
import { Message } from 'element-ui'

axios.defaults.baseURL = `${host}/mgt/api/v1`
axios.defaults.timeout = 60000
axios.interceptors.request.use(handleRequest)
axios.interceptors.response.use(handleResponse, handleResponseError)

function handleRequest(request) {
  return request
}

function handleResponse(res) {
  const { headers = {} } = res
  if (headers['x-page']) {
    res.meta = {
      per_page: +headers['x-per-page'][0],
      page: +headers['x-page'][0],
      total: +headers['x-total'][0],
    }
  }
  return res
}

async function handleResponseError(error) {
  const { response: { data, status }, config: { showErrorToast = true } } = error // showErrorToast：请求出错是否需要 toast 提示

  if (status === 401) {
    authStore.setNext(location.href)
    await router.replace({ path: 'signin' })
  } else {
    showErrorToast && Message.error({ message: getErrorMessage(data.error_message) })
  }

  return Promise.reject(error.response)
}

export default axios
