const env = {
  development: {
    host: 'http://127.0.0.1:3000',
  },
  staging: {
    host: 'https://lepebble.beansmile-dev.com',
  },
  production: {
    host: 'https://www.lepebble.com',
  },
}

export const { host } = env[process.env.NODE_ENV]
