const { APP_ENV } = process.env

export const APP_NAME = 'vue-kit'

// 本地存储 key 的统一前缀
export const LOCAL_PREFIX = '_@_@_'

export const HOST = {
  development: '',
  staging: '',
  production: '',
}[APP_ENV]
