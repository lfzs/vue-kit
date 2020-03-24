import dayjs from 'dayjs'

export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  const T = dayjs(time)
  return T.isValid() ? T.format(format) : time
}
