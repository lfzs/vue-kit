import Axios, { AxiosRequestConfig } from 'axios'
import { IS_CLIENT } from '@/constant'

// 通过参入 sign 参数，自动取消重复的请求
const autoCancelRequestBySign = (() => {
  const sourceMap = new Map()
  return (request: AxiosRequestConfig) => {
    const { sign } = request
    if (sign) {
      sourceMap.get(sign)?.cancel()

      const source = Axios.CancelToken.source()
      request.cancelToken = source.token // 请求添加 token 才可以取消
      sourceMap.set(sign, source)
    }
  }
})()

function handleRequest(request: AxiosRequestConfig) {
  if (IS_CLIENT) {
    autoCancelRequestBySign(request)
  }
  return request
}

export {
  handleRequest
}
