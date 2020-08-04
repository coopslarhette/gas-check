module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  rules: {
    semi: [2, 'never'],
    "@typescript-eslint/semi": [2, 'never'],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
