import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import boundaries from 'eslint-plugin-boundaries';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  ...compat.extends('prettier'),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    // 1. Base Configuration & Plugins
    plugins: {
      boundaries,
      '@typescript-eslint': tsEslintPlugin,
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
        { type: 'server-db', pattern: 'src/server/database/**' },

        // --- Client Layer (FSD) ---
        { type: 'app', pattern: 'src/app/**' },
        { type: 'client-widgets', pattern: 'src/client/widgets/**' },
        { type: 'client-features', pattern: 'src/client/features/**' },
        { type: 'client-entities', pattern: 'src/client/entities/**' },
        { type: 'client-db', pattern: 'src/client/database/**' },
        { type: 'client-shared', pattern: 'src/client/shared/**' },
      ],
    },
    rules: {
      camelcase: ['error', { properties: 'never' }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      // 3. Architectural Rules (Strict Boundaries)
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // ------------------------------------------
            // Rule 2: Common Layer (Foundation)
            // ------------------------------------------
            {
              from: 'common',
              allow: [],
            },

            // ------------------------------------------
            // Rule 3: Records vs Entities & Rule 5: Server DDD
            // ------------------------------------------
            {
              from: 'server-shared',
              allow: ['common', 'server-db'],
            },
            {
              from: 'server-entities',
              allow: ['common', 'server-shared', 'server-db'],
            },
            {
              from: 'server-features',
              // Can import Kernel, Shared, Common.
              // Cannot import other features (implicit via whitelist).
              allow: ['server-entities', 'server-shared', 'common'],
            },
            {
              from: 'server-db',
              allow: ['server-entities', 'common'],
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
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['warn'],

      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'warn',
    },
  },

  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', '**/*.scss', '**/*.css'],
  },
];

export default eslintConfig;
