import Axios, { AxiosError, RequestResponseData } from 'axios'
import { REQUEST_CANCEL_RESPONSE } from '@/constant'

function handleResponseError(error: AxiosError<RequestResponseData>) {
  // 请求取消
  if (Axios.isCancel(error)) return Promise.reject(REQUEST_CANCEL_RESPONSE)
  return Promise.reject(error)
}

export {
  handleResponseError
}
