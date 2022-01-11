import { RequestResponseData } from 'axios'

// 从 response 中获取 message
function getErrorMessage(response: RequestResponseData) {
  return response?.message ?? ''
}

export {
  getErrorMessage,
}
