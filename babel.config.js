module.exports = function(api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // for webpack target node
          targets: api.caller(caller => caller?.target === 'node') ? { node: 'current' } : {}
        },
      ]
    ],

    plugins: [
      'lodash',
      '@vue/babel-plugin-jsx',
      ['@babel/plugin-transform-runtime', {
        corejs: { version: 3, proposals: true },
      }],
    ],
  }
}
