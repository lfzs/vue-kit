// 本地存储 key 的统一前缀
export const LOCAL_PREFIX = '_@_@_'

// 请求出错错误弹窗默认内容
export const DEFAULT_ERROR_MESSAGE = '请求失败, 请重试'

// 运行时环境
export const IS_CLIENT = typeof window === 'object'
export const IS_SERVER = typeof window === 'undefined'
