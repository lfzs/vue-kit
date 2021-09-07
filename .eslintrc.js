module.exports = {
  root: true,

  extends: [
    './lib/eslint-config/base.js',
    './lib/eslint-config/vue.js',
    './lib/eslint-config/typescript.js',
  ],

  ignorePatterns: [
    'node_modules/**',
    'dist/**',
  ],
}
