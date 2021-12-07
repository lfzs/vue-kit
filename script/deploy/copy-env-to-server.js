const fs = require('fs')
const os = require('os')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const APP_ENV = process.env.APP_ENV || 'development'
const envPath = resolve(`../../.env.${APP_ENV}`)
const serverEnvPath = resolve('../../server/.env')

// renderToString 需要传递 NODE_ENV
const NODE_ENV = APP_ENV !== 'development' ? 'production' : 'development'
function copyEnv() {
  fs.copyFileSync(envPath, serverEnvPath)
  fs.appendFileSync(serverEnvPath, `${os.EOL}NODE_ENV=${NODE_ENV}`) // 追加 APP_ENV
}

module.exports = {
  copyEnv,
}
