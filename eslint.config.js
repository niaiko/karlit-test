// eslint.config.js
const globals = require('globals');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2021,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Règles de style
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],

      // Meilleures pratiques
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',

      // Règles de Node.js
      'handle-callback-err': 'error',
      'no-buffer-constructor': 'error',
      'no-path-concat': 'error',

      // Règles ES6+
      'arrow-spacing': 'error',
      'no-confusing-arrow': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
];

