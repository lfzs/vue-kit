import dayjs from 'dayjs'

// 时间格式化
export function formatTime(time, unit = 'YYYY-MM-DD HH:mm:ss') {
  const T = dayjs(time)
  return T.isValid() ? T.format(unit) : time
}

// 秒格式化
export function formatSecond(second, unit = 'DD HH:mm:ss') {
  const DD = `0${Math.floor(second / (24 * 3600))}`.substr(-2)
  const HH = `0${Math.floor(second / 3600 % 24)}`.substr(-2)
  const mm = `0${Math.floor(second / 60 % 60)}`.substr(-2)
  const ss = `0${Math.floor(second % 60)}`.substr(-2)
  return unit.replace('DD', DD).replace('HH', HH).replace('mm', mm).replace('ss', ss)
}
