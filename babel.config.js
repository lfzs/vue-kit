module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@vue/babel-plugin-jsx',
    ['component', { 'libraryName': 'element-plus', 'styleLibraryName': 'theme-chalk' }],
    ['@babel/plugin-transform-runtime', { 'corejs': { 'version': 3, 'proposals': true } }],
  ],
}
