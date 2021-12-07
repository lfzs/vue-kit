/* eslint-disable no-console */
const envPath = require.resolve(`../.env.${process.env.APP_ENV}`)
require('dotenv').config({ path: envPath })

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const history = require('connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')
const chalk = require('chalk')
const proxy = require('./proxy')

function createCompiler() {
  const config = require('./webpack.csr')
  config.entry = ['webpack-hot-middleware/client?quiet=true&reload=true&overlay=false', config.entry]
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  const compiler = webpack(config)
  return compiler
}

function main() {
  const app = express()
  app.set('x-powered-by', false)
  app.set('etag', false)
  Object.entries(proxy).forEach(([key, value]) => app.use(key, createProxyMiddleware(value)))
  app.use(history()) // history 模式路由全部降级到 /index.html

  const compiler = createCompiler()
  const instance = webpackDevMiddleware(compiler, {})
  app.use(instance)
  app.use(webpackHotMiddleware(compiler))
  instance.waitUntilValid(() => {
    const { PORT } = process.env
    const msg = chalk.green.underline.bold(`server is running at http://127.0.0.1:${PORT}`)
    app.listen(PORT, '0.0.0.0', () => console.log(msg))
  })
}

main()
