import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginHtml from 'eslint-plugin-html';
import boundaries from 'eslint-plugin-boundaries'; // 👈 Імпортуємо плагін
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 1. Base Configuration & Plugins
  {
    plugins: {
      boundaries,
    },
    // 2. Architecture Definition (Settings)
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        // --- Common Layer ---
        { type: 'common', pattern: 'src/common/**' },

        // --- Server Layer (DDD) ---
        { type: 'app-api', pattern: 'src/app/api/**' },
        { type: 'server-entities', pattern: 'src/server/entities/**' },
        { type: 'server-features', pattern: 'src/server/features/**' },
        { type: 'server-shared', pattern: 'src/server/shared/**' },

        // --- Client Layer (FSD) ---
        { type: 'app', pattern: 'src/app/**' },
        { type: 'client-widgets', pattern: 'src/client/widgets/**' },
        { type: 'client-features', pattern: 'src/client/features/**' },
        { type: 'client-entities', pattern: 'src/client/entities/**' },
        { type: 'client-db', pattern: 'src/client/database/**' },
        { type: 'client-shared', pattern: 'src/client/shared/**' },
      ],
    },
  },

  // 3. Architectural Rules (Strict Boundaries)
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // ------------------------------------------
            // Rule 2: Common Layer (Foundation)
            // ------------------------------------------
            // Common cannot import anything from internal project
            {
              from: 'common',
              allow: [],
            },

            // ------------------------------------------
            // Rule 3: Records vs Entities & Rule 5: Server DDD
            // ------------------------------------------
            {
              from: 'server-shared',
              allow: ['common'],
            },
            {
              from: 'server-entities', // Shared Kernel
              allow: ['common'],
            },
            {
              from: 'server-features',
              // Can import Kernel, Shared, Common.
              // Cannot import other features (implicit via whitelist).
              allow: ['server-entities', 'server-shared', 'common'],
            },

            // ------------------------------------------
            // Rule 4: Client-side (FSD Hierarchy)
            // ------------------------------------------
            // Shared (Bottom)
            {
              from: 'client-shared',
              allow: ['common'],
            },
            // Infrastructure (Database/Repo)
            {
              from: ['client-db'],
              allow: ['client-shared', 'common'],
            },
            // Entities (Can import shared, db, common)
            {
              from: 'client-entities',
              allow: ['client-shared', 'client-db', 'common'],
            },
            // Features (Can import entities, shared, common)
            {
              from: 'client-features',
              allow: ['client-entities', 'client-shared', 'common'],
            },
            // Widgets (Can import features, entities, shared, common)
            {
              from: 'client-widgets',
              allow: ['client-features', 'client-entities', 'client-shared', 'common'],
            },
            // App (Entry point - can import all Client layers)
            {
              from: 'app',
              allow: ['client-widgets', 'client-features', 'client-entities', 'client-shared', 'client-db', 'common'],
            },
            {
              from: 'app-api',
              allow: ['server-entities', 'server-features', 'server-shared', 'common'],
            },
          ],
        },
      ],

      // External Module Restrictions
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['warn'],
    },
  },

  // General rules for TS/TSX (Existing config)
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
      quotes: ['error', 'single', { avoidEscape: true }],
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
