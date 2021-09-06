const { APP_ENV } = process.env

// 应用的名字
export const APP_NAME = 'vue-kit'

// 本地存储 key 的统一前缀
export const LOCAL_PREFIX = '_@_@_'

// 请求/静态资源地址
export const BASE_URL = {
  development: '',
  staging: '',
  production: '',
}[APP_ENV]

// 请求出错错误弹窗默认内容
export const DEFAULT_ERROR_MESSAGE = '请求失败, 请重试'

// 是否运行在 server 环境下
export const IS_SERVER = typeof window === 'undefined'
