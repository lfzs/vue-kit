import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { router } from '@/router'
// import { authStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getErrorMessage } from '@/util/common'

const requestSetSignature = (() => {
  const sourceMap = new Map()
  return (request: AxiosRequestConfig) => {
    const { signature } = request
    if (signature) {
      sourceMap.get(signature)?.cancel()

      const source = Axios.CancelToken.source()
      request.cancelToken = source.token // 请求添加 token 才可以取消
      sourceMap.set(signature, source)
    }
  }
})()

// function requestSetToken(request: AxiosRequestConfig) {
//   if (authStore.token) request.headers['Access-Token'] = authStore.token
// }

export function handleRequest(request: AxiosRequestConfig) {
  requestSetSignature(request)
  // requestSetToken(request)
  return request
}

export function handleRequestError(error: AxiosError) {
  return Promise.reject(error)
}

export function handleResponse(response: AxiosResponse) {
  return response.data
}

export async function handleResponseError(error: AxiosError) {
  // 请求取消
  if (Axios.isCancel(error)) {
    return Promise.reject({ message: 'Request cancelled', code: -1 })
  }

  const {
    response = {} as AxiosResponse,
    config: {
      ignore401 = false,
      errorToast = true,
    } = {},
  } = error

  if (response.status === 401) {
    // TODO clearToken
    if (!ignore401) {
      // authStore.setNext(location.href)
      await router.replace('/signin')
    }
  } else {
    errorToast && ElMessage.error(getErrorMessage(response?.data)) // get 请求出错 toast 提示
  }

  return Promise.reject(error) // 注意：请求错误是抛出 error
}
