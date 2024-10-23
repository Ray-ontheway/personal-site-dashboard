export default {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
    'stylelint-order',
  ],
  overrides: [
    {
      files: ['**/*.{vue, html}'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.{css,scss}'],
      customSyntax: 'postcss-scss',
    },
    // {
    //   files: ['**/*.{css,scss,vue,html}'],
    //   rules: {
    //     'selector-class-pattern': /^([a-z0-9]+(-[a-z0-9]+)*|([a-z0-9]+__[a-z0-9]+))$/,
    //   },
    // },
  ],
}
