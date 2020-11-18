export fetchAction from './fetch-action'
export axios from './axios'

export function sleep(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 从 res 中获取 message
export function getErrorMessage(error, defaultMessage = '请求失败, 请重试') {
  if (error === undefined) return defaultMessage
  if (typeof error === 'string') return error
  return error.message || defaultMessage
}
