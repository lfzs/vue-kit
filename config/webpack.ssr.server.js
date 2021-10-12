const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = merge(base, {
  entry: resolve('../src/entry/server.ts'),
  target: 'node',
  // 跳过 node_mdoules(会在运行时加载)
  externals: [nodeExternals({
    allowlist: [/\.(less|scss|css|vue)$/],
  })],
  externalsPresets: { node: true },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  output: {
    filename: 'index.js',
    path: resolve('../dist/server'),
    library: {
      type: 'commonjs2',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __SSR_ENV__: JSON.stringify('server'),
    }),
    // 只生成一个 chunk
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  optimization: {
    // 关闭优化
    splitChunks: false,
    minimize: false,
  },
})
