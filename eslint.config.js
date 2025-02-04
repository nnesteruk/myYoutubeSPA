import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReact from 'eslint-plugin-react';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...eslintConfigPrettier.rules,
      'no-var': 'error',
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      'prefer-const': 'warn',
    },
  },
  {
    plugins: {
      'react-hooks': eslintReactHooks,
      react: eslintReact,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
  },
  {
    languageOptions: { globals: globals.browser },
    parserOptions: { project: ['tsconfig.json', 'tsconfig.node.json'] },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  { ignores: ['node_modules', 'dist'] },
];
