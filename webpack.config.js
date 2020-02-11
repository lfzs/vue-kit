const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // production 合并 style 到 .css 文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // production 压缩 .css 文件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.[name].[hash:4].js',
    chunkFilename: 'chunk.[name].[hash:4].js',
    publicPath: '/',
  },
  watch: isDev,
  mode: isDev ? 'development' : 'production',
  devServer: {
    port: '8080',
    host: '0.0.0.0',
    disableHostCheck: true,
    clientLogLevel: 'silent',
    // open: true,
    historyApiFallback: true,
    quiet: true,
    hot: true,
    stats: 'errors-warnings',
    proxy: {
      '/mgt': {
        target: 'https://lepebble.beansmile-dev.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  devtool: isDev && 'cheap-module-eval-source-map',
  resolve: {
    alias: { '@': resolve('src') },
    extensions: ['.js', '.json', '.vue'],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({ files: '**/*.{vue,html,css,less,scss,sass}', context: './src' }),
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),
  ].concat(isDev ? [] : [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name].[hash:4].css' }), new OptimizeCSSAssetsPlugin()]),
  module: {
    rules: [
      { test: /\.(js|vue)$/, use: [{ loader: 'eslint-loader', options: { failOnWarning: !isDev } }], exclude: /node_modules/, enforce: 'pre' },
      { test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

      { test: /\.css$/, use: [isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader , 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,  'css-loader', 'postcss-loader', { loader: 'less-loader', options: { globalVars: require('./src/style/less-var') } }] },
      // { test: /\.scss$/, use: [isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'sass-loader', options: { prependData: '@import "~@/style/sass-var.scss";' } }] },

      { test: /\.(png|jpg|gif|jpeg|svg)$/, use: [{ loader: 'file-loader', options: { name: '[name].[hash:4].[ext]', outputPath: 'assets/', esModule: false } }] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: [{ loader: 'file-loader', options: { name: '[name].[hash:4].[ext]', outputPath: 'assets/', esModule: false } }] },
    ]
  },
  performance: {
    hints: false,
  },
}
