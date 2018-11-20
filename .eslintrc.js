module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'global-require': 0,
    "semi": ['error', 'always'],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    'no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    'comma-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    "react/destructuring-assignment": 0,
    "react/no-array-index-key": 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    "linebreak-style": [0 ,"error", "windows"]
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};