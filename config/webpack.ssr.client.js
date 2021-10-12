const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = merge(base, {
  entry: resolve('../src/entry/client.ts'),
  target: 'web',
  devtool: isDev && 'eval-cheap-module-source-map',
  output: {
    path: resolve('../dist/client'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      favicon: resolve('../public/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      __SSR_ENV__: JSON.stringify('client'),
    }),
    // copy static 文件夹下的内容到根目录
    new CopyPlugin({
      patterns: [{ from: resolve('../static'), noErrorOnMissing: true }],
    }),
  ],
})
