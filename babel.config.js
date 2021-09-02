module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    'lodash',
    '@vue/babel-plugin-jsx',
    ['@babel/plugin-transform-runtime', {
      corejs: { version: 3, proposals: true },
    }],
    ['import', {
      libraryName: 'element-plus',
      customName: name => `element-plus/lib/components/${name.slice(3)}`,
      customStyleName: name => `element-plus/lib/components/${name.slice(3)}/style`,
    }],
  ],
}
