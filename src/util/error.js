// 从 response 中获取 message
export function getErrorMessage(response, defaultMessage = '请求失败, 请重试') {
  if (typeof response === 'string') return response
  return response?.message ?? defaultMessage
}
