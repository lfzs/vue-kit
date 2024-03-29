module.exports = {
  extends: [
    'plugin:vue/vue3-strongly-recommended',
  ],

  // parser: 'vue-eslint-parser',
  // parserOptions: {
  //   parser: '@babel/eslint-parser',
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },

  rules: {
    'vue/array-bracket-spacing': 2,
    'vue/arrow-spacing': 2,
    'vue/block-spacing': 2,
    'vue/brace-style': [2, '1tbs', { allowSingleLine: true }],
    'vue/comma-dangle': [2, 'always-multiline'],
    'vue/comma-spacing': 2,
    'vue/component-definition-name-casing': [2, 'kebab-case'],
    'vue/component-name-in-template-casing': [2, 'kebab-case'],
    'vue/dot-notation': 2,
    'vue/eqeqeq': 2,
    'vue/func-call-spacing': 2,
    'vue/html-self-closing': 2,
    'vue/keyword-spacing': 2,
    'vue/key-spacing': 2,
    'vue/max-attributes-per-line': [2, { singleline: 5 }],
    'vue/multiline-html-element-content-newline': [2, { allowEmptyLines: true }],
    'vue/no-irregular-whitespace': 2,
    'vue/no-lone-template': 2,
    'vue/no-reserved-component-names': 2,
    'vue/no-useless-concat': 2,
    'vue/no-useless-mustaches': 2,
    'vue/no-useless-v-bind': 2,
    'vue/padding-line-between-blocks': 2,
    'vue/prefer-template': 2,
    'vue/require-direct-export': 2,
    'vue/require-name-property': 2,
    'vue/script-indent': [2, 2, { baseIndent: 1, switchCase: 1 }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/space-infix-ops': 2,
    'vue/space-in-parens': 2,
    'vue/template-curly-spacing': 2,
    'vue/this-in-template': 2,
    'vue/valid-define-props': 2,
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 0,
      },
    },
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
}
