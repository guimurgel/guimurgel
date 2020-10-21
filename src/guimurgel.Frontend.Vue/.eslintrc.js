module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    //Custom
    'no-unused-vars':  process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-case-declarations':  process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef':  process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'allowEmptyCatch':  process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    //Vue - [0 = off, 1 = warn, 2 = error]
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 0,
    "vue/no-unused-components": process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
