/* eslint-disable no-console */
const envPath = require.resolve(`../.env.${process.env.APP_ENV}`)
require('dotenv').config({ path: envPath })

const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')
const express = require('express')
const { renderToString } = require('@vue/server-renderer')
const { renderHeadToString } = require('@vueuse/head')
const serialize = require('serialize-javascript')
const chalk = require('chalk')
const proxy = require('./proxy')

function logWebpackStats() {
  // TODO server 端不输出错误信息
  // const info = stats.toJson()
  // const { warnings } = info
  // const { errors } = info
  // const warnMsg = chalk.yellow.bold(`${warnings.length} warning`)
  // const errorMsg = chalk.red.bold(`${errors.length} error`)

  // if (warnings.length) {
  //   console.log(warnMsg)
  //   info.warnings.forEach(error => console.warn(error.message))
  // }
  // if (errors.length) {
  //   console.log(errorMsg)
  //   errors.forEach(error => console.error(error.message))
  // }
}

// 创建客户端 webpack compiler
function createClientCompiler() {
  const config = require('./webpack.ssr.client')
  config.entry = ['webpack-hot-middleware/client?quiet=true&reload=true&overlay=false', config.entry]
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  const compiler = webpack(config)
  return compiler
}

// 创建服务端 webpack compiler
function createServerCompilerAndRun() {
  return new Promise((resolve, reject) => {
    const config = require('./webpack.ssr.server')
    const compiler = webpack(config)
    compiler.watch({ /* watchOptions */ }, (error, stats) => {
      if (error) {
        console.error(error.stack || error)
        error.details && console.error(error.details)
        return reject()
      }
      logWebpackStats(stats)
      resolve(compiler)
    })
  })
}

async function main() {
  const app = express()
  app.set('x-powered-by', false)
  app.set('etag', false)
  Object.entries(proxy).forEach(([key, value]) => app.use(key, createProxyMiddleware(value)))

  const serverCompiler = await createServerCompilerAndRun()
  const clientCompiler = createClientCompiler()

  const instance = webpackDevMiddleware(clientCompiler, { serverSideRender: true, index: false })
  app.use(instance)
  app.use(webpackHotMiddleware(clientCompiler))

  app.use(async (req, res) => {
    const readTemplate = (req, res) => {
      const { outputFileSystem, stats } = res.locals.webpack.devMiddleware
      const { outputPath } = stats.toJson()
      const buffer = outputFileSystem.readFileSync(path.join(outputPath, 'index.html'))
      const template = buffer.toString()
      return template
    }

    const createApp = req => {
      const { createApp } = require(serverCompiler.outputPath)
      return createApp(req.url)
    }

    try {
      const template = readTemplate(req, res)
      const { app, router, store, head } = await createApp(req)
      const ssrContext = { app, router, store, req }
      const appContent = await renderToString(app, ssrContext)
      const { headTags } = renderHeadToString(head)
      const storeState = `<script>window.__INITIAL_STATE__=${serialize(store.state.value)}</script>`
      const html = template
        .replace('</body>', `${appContent}${storeState}</body>`)
        .replace('</head>', `${headTags}</head>`)
      res.status(200).type('html').send(html)
    } catch (error) {
      console.log('render error', error)
      res.status(500).end()
    }
  })

  instance.waitUntilValid(() => {
    const { PORT } = process.env
    const msg = chalk.green.underline.bold(`\nserver is running at http://127.0.0.1:${PORT}`)
    app.listen(PORT, '0.0.0.0', () => console.log(msg))
  })
}

main()
