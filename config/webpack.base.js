const { rules } = require('./rule')
const { plugins } = require('./plugin')

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  output: {
    clean: true,
    filename: `js/${isDev ? '[name]' : '[fullhash]'}.js`,
    chunkFilename: `js/${isDev ? 'chunk.[name]' : '[contenthash]'}.js`,
    assetModuleFilename: 'static/[hash][ext][query]',
    publicPath: '/',
  },
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve('../src'),
    },
  },
  plugins,
  module: {
    rules,
  },
  experiments: {
    // 需要 webpack 支持，babel 无插件支持
    topLevelAwait: true,
  },
  stats: 'errors-warnings',
  performance: {
    hints: false,
  },
}
