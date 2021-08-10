module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [2, { multiline: { delimiter: 'comma' }, singleline: { delimiter: 'comma' } }],
    '@typescript-eslint/no-explicit-any': [2, { ignoreRestArgs: true }],
    '@typescript-eslint/type-annotation-spacing': 2,

    // Extension Rules
    // 一些声明规则对 .ts 无效时， 需要在此添加
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
    'no-dupe-class-members': 0,
    '@typescript-eslint/no-dupe-class-members': 2,
  },

  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ]
}
