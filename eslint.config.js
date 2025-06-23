import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import parserVue from 'vue-eslint-parser';
import parserTs from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTs,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Prettier rules
      'prettier/prettier': 'error',

      // General rules
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: parserTs,
      sourceType: 'module',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'public/**'],
  },
];
