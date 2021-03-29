import Axios from 'axios'
import { HOST } from '@/constant'
import router from '@/router'
import { authStore } from '@/store'

const axios = Axios.create({
  baseURL: `${HOST}/api`,
  timeout: 60000,
})

axios.interceptors.request.use(handleRequest)
axios.interceptors.response.use(handleResponse, handleResponseError)

function handleRequest(request) {
  return request
}

function handleResponse(response) {
  return response.data
}

async function handleResponseError(error) {
  const { response, config: { ignore401 = false } } = error

  if (response?.status === 401) {
    if (!ignore401) {
      authStore.setNext(location.href)
      await router.replace('/signin')
    }
  }

  return Promise.reject(error) // 注意：请求错误是抛出 error
}

export default axios
