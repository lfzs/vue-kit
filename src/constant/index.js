const flag = process.env.APP_ENV.toLocaleUpperCase()

export const HOST = {
  DEVELOPMENT: '',
  STAGING: '',
  PRODUCTION: '',
}[flag]

export const TOKEN_KEY = `TOKEN_${flag}`
export const APP_NAME = 'app_name'
