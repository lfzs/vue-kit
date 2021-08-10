import { RequestResponseData } from 'axios'
import { DEFAULT_ERROR_MESSAGE } from '@/constant'

// 从 response 中获取 message
function getErrorMessage(response: RequestResponseData, defaultMessage = DEFAULT_ERROR_MESSAGE) {
  return response.message ?? defaultMessage
}

export {
  getErrorMessage,
}
