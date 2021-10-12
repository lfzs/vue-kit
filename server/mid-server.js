const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = new express()
app.use('/api', createProxyMiddleware({ target: 'http://61.143.211.105:5003', changeOrigin: true }))
app.listen(9000, '0.0.0.0')
