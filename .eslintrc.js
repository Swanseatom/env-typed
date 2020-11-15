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
      "indent": ["error", 2]
    }
  };