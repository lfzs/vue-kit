module.exports = {
  root: true,

  env: {
    es2021: true,
    node: true,
    browser: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  extends: [
    './lib/eslint-config/base.js',
    './lib/eslint-config/vue.js',
    './lib/eslint-config/typescript.js',
  ],
}
