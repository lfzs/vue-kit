const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // production 环境，提取行内的 style 到 .css 文件 利于缓存处理。dev 模式不提取为了热更新
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // production 压缩 .css 文件
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.[name].[hash:4].js',
    chunkFilename: 'js/chunk.[name].[contenthash:4].js',
    publicPath: '/',
  },
  mode: isDev ? 'development' : 'production',
  devServer: {
    host: '0.0.0.0',
    // useLocalIp: true,
    disableHostCheck: true,
    clientLogLevel: 'silent',
    open: true,
    historyApiFallback: true,
    quiet: true,
    hot: true,
    stats: 'errors-warnings',
    // proxy: {
    //   '/mgt': {
    //     target: '',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  devtool: isDev && 'eval-cheap-source-map',
  resolve: {
    alias: { '@': resolve('src') },
    extensions: ['.js', '.json', '.vue'],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.EnvironmentPlugin(['APP_ENV']),
    new VueLoaderPlugin(),
    new StyleLintPlugin({ files: '**/*.{vue,html,css,less,scss,sass}', context: resolve('src'), emitWarning: isDev, emitError: !isDev }),
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),
    new CopyPlugin({ patterns: [{ from: './public/!(index.html|favicon.ico)/**/*', noErrorOnMissing: true }] }),
  ].concat(isDev ? [new webpack.HotModuleReplacementPlugin()] : [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:4].css' }), new OptimizeCSSAssetsPlugin()]),
  module: {
    rules: [
      { test: /\.(js|vue)$/, use: [{ loader: 'eslint-loader', options: { cache: true, emitWarning: isDev, emitError: !isDev } }], exclude: /node_modules/, include: resolve('src'), enforce: 'pre' },
      { test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader?cacheDirectory=true', exclude: /node_modules/ },

      // https://github.com/vuejs/vue-style-loader/issues/46 为什么需要设置 esModule: false
      { test: /\.css$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'less-loader', options: { additionalData: '@import "~@/style/less-var.less";' } }] },
      { test: /\.scss$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'sass-loader', options: { additionalData: '@import "~@/style/sass-var.scss";' } }] },

      { test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/, use: [{ loader: 'file-loader', options: { name: 'static/[name].[contenthash:4].[ext]', esModule: false } }] },
    ],
  },
  performance: {
    hints: false,
  },
}
