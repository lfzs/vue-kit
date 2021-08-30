const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = merge(base, {
  entry: resolve('../src/entry/server.ts'),
  target: 'node',
  // 跳过 node_mdoules(运行时加载，不需要编译)
  externals: nodeExternals({ allowlist: /\.(css)$/ }),
  devtool: isDev && 'source-map',

  output: {
    filename: 'main.js',
    path: resolve('../dist/server'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    // 只生成一个 chunk
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  optimization: {
    // 关闭优化
    splitChunks: false,
    minimize: false,
  },
})
