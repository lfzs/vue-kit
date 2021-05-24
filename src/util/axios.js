import Axios from 'axios'
import { HOST } from '@/constant'
import router from '@/router'
import { authStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getErrorMessage } from '@/util'

const axios = Axios.create({
  baseURL: `${HOST}/api`,
  timeout: 60000,
})

axios.interceptors.request.use(handleRequest, handleRequestError)
axios.interceptors.response.use(handleResponse, handleResponseError)

const sourceMap = new Map()
function handleRequest(request) {
  const { signature } = request

  if (signature) {
    // signature 需要保持唯一，signature 意味着每次请求会取消之前发出相同的请求
    sourceMap.get(signature)?.cancel()
    const source = Axios.CancelToken.source()
    request.cancelToken = source.token // 请求添加 token 才可以取消
    sourceMap.set(signature, source)
  }
  return request
}

function handleRequestError(error) {
  return Promise.reject(error)
}

function handleResponse(response) {
  return response.data
}

async function handleResponseError(error) {
  if (Axios.isCancel(error)) return Promise.reject({ message: 'Request cancelled', code: -1 }) // 请求取消

  const { response = {}, config: { ignore401 = false, getErrorToast = true } = {} } = error

  if (response.status === 401) {
    if (!ignore401) {
      authStore.setNext(location.href)
      await router.replace('/signin')
    }
  } else {
    getErrorToast && ElMessage.error(getErrorMessage(response?.data)) // get 请求出错 toast 提示
  }

  return Promise.reject(error) // 注意：请求错误是抛出 error
}

export default axios
