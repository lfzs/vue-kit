import axios from 'axios'
import { host } from '@/util'
import router from '@/router'
import { authStore } from '@/store'
import { Message } from 'element-ui'

axios.defaults.baseURL = `${host}/mgt/api/v1`
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
  const { response: { data, status }, config: { errorTips = true } } = error

  if (status === 401) {
    authStore.setNext(location.href)
    await router.replace({ path: 'signin' })
  } else {
    errorTips && Message.error({ message: data.error_message || '请求失败，请重试' })
  }

  return Promise.reject(error.response)
}

export default axios
