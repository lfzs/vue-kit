import axios from 'axios'
import { host } from '@/util'
import router from '@/router'
import { authStore } from '@/store'
import { Message } from 'element-ui'

axios.defaults.baseURL = `${host}/mgt/api/v1`
axios.interceptors.request.use(handleRequest, handleRequestError)
axios.interceptors.response.use(handleResponse, handleResponseError)

function handleRequest(request) {
  return request
}

function handleRequestError(error) {
  Message.error({ message: '请求超时！' })
  return Promise.resolve(error)
}

function handleResponse(res) {
  return res
}

async function handleResponseError(error) {
  const { response: { data, status }, config: { errorTips = true } } = error

  if (status === 401) {
    authStore.signinNext(router.currentRoute.fullPath)
    try {
      await router.replace({ path: 'signin' })
    } catch (e) {
      return Promise.reject(error.response)
    }
  } else {
    errorTips && Message.error({ message: data.error_message || '请求失败，请重试' })
  }

  return Promise.reject(error.response)
}

export default axios
