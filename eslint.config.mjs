import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginHtml from 'eslint-plugin-html';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // General rules for TS/TSX
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      camelcase: ['error'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],

      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],

      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

      'react/jsx-first-prop-new-line': ['error', 'multiline'],

      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],

      'react/self-closing-comp': 'error',

      'react/jsx-equals-spacing': ['error', 'never'],
    },
  },

  {
    files: ['**/*.html'],
    plugins: {
      html: eslintPluginHtml,
      '@typescript-eslint': tsEslintPlugin,
    },
    processor: 'html/html',
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
    },
  },

  {
    files: ['**/*.scss'],
    ignores: ['**/*.scss'],
  },
];

export default eslintConfig;
