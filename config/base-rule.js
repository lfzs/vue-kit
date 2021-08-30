const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.APP_ENV === 'development'

const css = {
  test: /\.css$/,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    isDev ? false : 'postcss-loader',
  ].filter(Boolean),
}

const less = {
  test: /\.less$/,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    isDev ? false : 'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        additionalData: '@import "@/style/var-less.less";',
      }
    }
  ].filter(Boolean),
}

const scss = {
  test: /\.scss$/,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    isDev ? false : 'postcss-loader',
    'sass-loader',
  ].filter(Boolean),
}

const vue = {
  test: /\.vue$/,
  use: 'vue-loader',
  exclude: /node_modules/,
}

const js = {
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /node_modules/,
}

const ts = {
  test: /\.tsx?$/,
  use: [
    'babel-loader',
    {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: ['\\.vue$'],
      },
    },
  ],
}

const static = {
  test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/,
  type: 'asset/resource',
}

module.exports = {
  rules: [
    css,
    less,
    scss,
    vue,
    js,
    ts,
    static,
  ],
}
