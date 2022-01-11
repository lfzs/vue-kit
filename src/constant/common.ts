// 本地存储 key 的统一前缀
export const LOCAL_PREFIX = '_@_@_'

// 运行时环境
export const IS_CLIENT = typeof window === 'object'
export const IS_SERVER = typeof window === 'undefined'

// 客户端请求取消默认返回值
export const REQUEST_CANCEL_RESPONSE = {
  code: 49900
}
