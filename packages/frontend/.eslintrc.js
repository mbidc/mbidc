module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [".eslintrc.js", "node_modules/", "dist/", "build/"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": false,
      "trailingComma": "all"
    }],
    '@typescript-eslint/no-explicit-any': 'off',
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
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    }
  }
};
