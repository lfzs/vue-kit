import Axios, { AxiosError, RequestResponseData } from 'axios'

const requestCancelResponseData = {
  message: 'Request cancelled',
  code: -1
}

function handleResponseError(error: AxiosError<RequestResponseData>) {
  // 请求取消
  if (Axios.isCancel(error)) return Promise.reject(requestCancelResponseData)
  return Promise.reject(error.response?.data)
}

export {
  handleResponseError
}
