const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.APP_ENV === 'development'

const css = {
  test: /\.css$/,
  use: [
    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: isDev ? 0 : 1,
      },
    },
    isDev ? false : 'postcss-loader',
  ].filter(Boolean),
}

const less = {
  test: /\.less$/,
  use: [
    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: isDev ? 1 : 2,
      },
    },
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
    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: isDev ? 1 : 2,
      },
    },
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
  test: /\.(png|gif|jpg|jpeg|svg|bmp|webp|ttf|otf|woff|woff2|eot)$/,
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
