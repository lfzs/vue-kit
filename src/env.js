const env = {
  development: {
    host: '',
  },
  staging: {
    host: '',
  },
  production: {
    host: '',
  },
}

export const { host } = env[process.env.TARGET_ENV]
