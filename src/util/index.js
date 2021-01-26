import dayjs from 'dayjs'

export fetchAction from './fetch-action'
export axios from './axios'

export function sleep(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 从 response 中获取 message
export function getErrorMessage(response, defaultMessage = '请求失败, 请重试') {
  if (typeof response === 'string') return response
  return response?.message ?? defaultMessage
}

export const formatTime = (time, unit = 'YYYY-MM-DD HH:mm:ss') => {
  const T = dayjs(time)
  return T.isValid() ? T.format(unit) : time
}
