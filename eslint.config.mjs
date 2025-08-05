import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import eslintPluginHtml from 'eslint-plugin-html';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // General rules
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
      'camelcase': ['error'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
    },
  },

  // HTML files
  {
    files: ['**/*.html'],
    plugins: {
      html: eslintPluginHtml,
      '@typescript-eslint': tsEslintPlugin,
    },
    processor: 'html/html',
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
    },
  },

  {
    files: ['**/*.scss'],
    ignores: ['**/*.scss'],
  },
];

export default eslintConfig;
