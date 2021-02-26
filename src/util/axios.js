import axios from 'axios'
import { HOST } from '@/constant'
import router from '@/router'
import { authStore } from '@/store'

axios.defaults.baseURL = `${HOST}/api`
axios.defaults.timeout = 60000
axios.interceptors.request.use(handleRequest)
axios.interceptors.response.use(handleResponse, handleResponseError)

function handleRequest(request) {
  return request
}

function handleResponse(response) {
  return response.data
}

async function handleResponseError(error) {
  const { response: { data, status } } = error

  if (status === 401) {
    authStore.setNext(location.href)
    await router.replace({ path: 'signin' })
  }

  return Promise.reject(data)
}

export default axios
