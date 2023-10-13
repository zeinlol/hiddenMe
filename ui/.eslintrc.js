module.exports = {
  extends: [
    'mantine',
    'plugin:@next/next/recommended',
    'plugin:jest/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    
    'indent': ['error', 2, {'SwitchCase': 1}],
    "react/jsx-max-props-per-line": [1, { "maximum": { "single": 2, "multi": 1 } }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['warn', 'single'],
    '@typescript-eslint/semi': 'off',
    'semi': ['warn', 'never'],
    'no-console': 'off',
    'no-extra-semi': 'warn',
    
    "max-len": ["error", {
      "code": 120,
      "tabWidth": 2,
      "ignoreUrls": true,
      "ignoreTrailingComments": false,
      "ignoreComments": false,
      "ignoreStrings": false,
      "ignoreRegExpLiterals": false,
      "ignoreTemplateLiterals": false,
    }]
  },
};
