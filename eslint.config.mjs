// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-plugin-next';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off'
    },
  },
];
