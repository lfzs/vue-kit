const resolve = dir => require('path').join(__dirname, dir)
const envPath = resolve(`../.env.${process.env.APP_ENV}`)
require('dotenv').config({ path: envPath })

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.APP_ENV === 'development'

const plugins = [
  new webpack.ProgressPlugin(),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
  }),
  new Dotenv({ path: envPath }),
  new StyleLintPlugin({
    files: ['**/*.{vue,html,css,less,scss,sass}'],
    context: resolve('../src'),
    emitError: true,
    emitWarning: true,
    failOnError: !isDev,
    failOnWarning: !isDev,
  }),
  new ESLintPlugin({
    extensions: ['ts', 'tsx', 'js', 'vue'],
    context: resolve('../src'),
    failOnError: !isDev,
    failOnWarning: !isDev,
  }),
  // new BundleAnalyzerPlugin(),
].concat(isDev ? [

] : [
  new MiniCssExtractPlugin({
    filename: 'css/[contenthash].css',
    chunkFilename: 'css/[contenthash].css',
  })
])

module.exports = {
  plugins
}
