const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')

const isDev = process.env.APP_ENV === 'development'
// TODO ssr copy 文件
// const isSSR = process.env.SSR
const resolve = dir => require('path').join(__dirname, dir)

module.exports = merge(base, {
  entry: resolve('../src/entry/client.ts'),
  target: 'web',
  devServer: {
    host: 'local-ip',
    historyApiFallback: true, // 路由全部重定向到首页
    client: {
      logging: 'none',
      overlay: false,
      progress: true,
    },
    proxy: {
      '/api': {
        target: 'http://www.duelday.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  devtool: isDev && 'eval-cheap-source-map',
  output: {
    path: resolve('../dist/client'),
  },
  plugins: [
    new webpack.DefinePlugin({
      // 客户端环境注入 browser 自动
      'process.env.browser': '1',
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      favicon: resolve('../public/favicon.ico'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '../public/**/*',
          globOptions: {
            ignore: ['**/public/index.html', '**/public/favicon.ico']
          },
          noErrorOnMissing: true,
        }
      ],
    }),
  ],
})
