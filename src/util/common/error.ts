// 从 response 中获取 message
interface Response {
  message: string,
}

function getErrorMessage(response: Response | string, defaultMessage = '请求失败, 请重试') {
  if (typeof response === 'string') return response
  else return response?.message ?? defaultMessage
}

export {
  getErrorMessage,
}
