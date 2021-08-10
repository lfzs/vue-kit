import Axios, { AxiosRequestConfig } from 'axios'
// import { authStore } from '@/store'

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

function handleRequest(request: AxiosRequestConfig) {
  requestSetSignature(request)
  // requestSetToken(request)
  return request
}

export {
  handleRequest
}
