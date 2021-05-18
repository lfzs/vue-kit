const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // production 环境，提取行内的 style 到 .css 文件 利于缓存处理。dev 模式不提取为了热更新
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    filename: `js/${isDev ? '[name]' : '[fullhash]'}.js`,
    chunkFilename: `js/${isDev ? 'chunk.[name]' : '[contenthash]'}.js`,
    assetModuleFilename: 'static/[hash][ext][query]',
    publicPath: process.env.BASE_URL || '/',
  },
  mode: isDev ? 'development' : 'production',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // open: process.env.BASE_URL || '/',
    historyApiFallback: true, // 路由全部重定向到首页
    client: { logging: 'none', overlay: false },
    // proxy: {
    //   '/api': {
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
    new webpack.DefinePlugin({ __VUE_OPTIONS_API__: false, __VUE_PROD_DEVTOOLS__: false }),
    new webpack.EnvironmentPlugin(['APP_ENV', 'BASE_URL']),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({ files: '**/*.{vue,html,css,less,scss,sass}', context: resolve('src'), emitWarning: true, failOnError: !isDev, failOnWarning: !isDev }),
    new ESLintPlugin({ extensions: ['js', 'vue'], context: resolve('src'), failOnError: !isDev, failOnWarning: !isDev }),
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),
    new CopyPlugin({ patterns: [{ from: './public/!(index.html|favicon.ico)/**/*', noErrorOnMissing: true }] }),
  ].concat(isDev ? [new webpack.HotModuleReplacementPlugin()] : [new MiniCssExtractPlugin({ filename: 'css/[contenthash].css', chunkFilename: 'css/[contenthash].css' })]),
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.tsx?$/, loader: 'ts-loader' },

      { test: /\.css$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'less-loader', options: { additionalData: '@import "@/style/var-less.less";' } }] },
      { test: /\.scss$/, use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'sass-loader', options: { additionalData: '@import "@/style/var-sass.scss";' } }] },

      { test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/, type: 'asset/resource' },
    ],
  },
  stats: 'info',
  experiments: {
    topLevelAwait: true,
  },
  performance: {
    hints: false,
  },
}
