/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',

    // React
    'plugin:react/recommended',

    // Prettier
    'plugin:prettier/recommended',

    // Typescript
    'plugin:@typescript-eslint/recommended',

    // JSX A11y
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    // REACT
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    // General
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
    'prefer-const': 'error',
    curly: ['error', 'all'],
    'no-extra-boolean-cast': 'error',
    'no-debugger': 'error',

    // Typescript
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',

    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',

    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        vars: 'all',
        args: 'all',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // REACT
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'static-variables',
          'instance-variables',
          'type-annotations',
          'lifecycle',
          'everything-else',
          'render',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'getDerivedStateFromError',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],

    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',

    'react-hooks/exhaustive-deps': 'warn',

    'react-hooks/rules-of-hooks': 'error',

    // A11y
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    // Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        arrowParens: 'avoid',
        endOfLine: 'auto',
        tabWidth: 2,
        useTabs: false,
        bracketSameLine: false,
      },
    ],
  },
};
