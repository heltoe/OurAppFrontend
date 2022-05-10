const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
)

module.exports = {
  // Настройки проекта
  env: {
    browser: true,
    jest: true,
  },
  // Движок парсинга
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Движку нужен проект TS для правил с типами
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
  },
  // Наборы правил
  extends: ['airbnb-typescript', 'react-app', 'prettier', 'prettier/react'],
  // Плагин с наборами правил для TypeScript
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-console': 'error',
    'no-debugger': 'error',
    quotes: ['error', 'single'],
    'max-len': [1, { code: 110 }],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'react/prop-types': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'no-plusplus': 0,
  },
}
