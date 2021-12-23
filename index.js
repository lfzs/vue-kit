const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const envPath = require.resolve(`./.env.${process.env.APP_ENV}`)
require('dotenv').config({ path: envPath })

const fs = require('fs')
const serialize = require('serialize-javascript')
const { renderToString } = require('@vue/server-renderer')
const { renderHeadToString } = require('@vueuse/head')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { createApp } = require('./dist/server')

const app = new express()
app.set('x-powered-by', false)
// app.set('etag', false)

// app.use(require('compression')()) // 开启 gzip
const options = {
  lastModified: false,
  etag: false,
  // maxAge: '30d',
}
app.use('/static', express.static(resolve('./dist/client/static'), options))
app.use('/js', express.static(resolve('./dist/client/js'), options))
app.use('/css', express.static(resolve('./dist/client/css'), options))
app.use('/favicon.ico', express.static(resolve('./dist/client/favicon.ico'), { lastModified: false }))
app.use('/api', createProxyMiddleware({ target: process.env.SERVER_HOST, changeOrigin: true }))

const template = fs.readFileSync(resolve('./dist/client/index.html'))
app.get('*', async (req, res) => {
  try {
    const { app, router, store, head } = await createApp(req.url)
    // 搭配 useSSRContext() 使用
    const ssrContext = { app, router, store, req }
    const appContent = await renderToString(app, ssrContext)
    const { headTags } = renderHeadToString(head)
    const storeState = `<script>window.__INITIAL_STATE__=${serialize(store.state.value)}</script>`
    const html = template
      .toString()
      .replace('</body>', `${appContent}${storeState}</body>`)
      .replace('</head>', `${headTags}</head>`)
    res.status(200).type('html').end(html)
  } catch (error) {
    // TODO server error html
    // 渲染出错，降级到客户端渲染
    // console.log('render error---------------------------')
    // console.log(error)
    res.status(200).type('html').end(template)
  }
})

app.listen(process.env.PORT, '0.0.0.0')
