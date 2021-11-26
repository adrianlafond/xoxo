module.exports = {
  env: {
    jest: true
  },
  extends: [
    'standard'
  ],
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }]
  }
}
