import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { ignores: ['**/node_modules', '**/dist/'] },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    languageOptions: {
      parser: parserVue,
      parserOptions: { parser: tseslint.parser },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
