module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/', 'build/'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "plugin:@typescript-eslint/recommended",
    'prettier',
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    "prettier/prettier": ["error", { "singleQuote": false }],
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
    'semi': ["error", "always"],
    'quotes': [2, "double", "avoid-escape"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        'alphabetize': {
          'order': "asc",
        },
      },
    ],
  },
};