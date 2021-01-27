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

export function formatTime(time, unit = 'YYYY-MM-DD HH:mm:ss') {
  const T = dayjs(time)
  return T.isValid() ? T.format(unit) : time
}

export function formatSecond(second, unit) {
  const DD = `0${Math.floor(second / (24 * 3600))}`.substr(-2)
  const HH = `0${Math.floor(second / 3600 % 24)}`.substr(-2)
  const mm = `0${Math.floor(second / 60 % 60)}`.substr(-2)
  const ss = `0${Math.floor(second % 60)}`.substr(-2)
  return unit.replace('DD', DD).replace('HH', HH).replace('mm', mm).replace('ss', ss)
}
