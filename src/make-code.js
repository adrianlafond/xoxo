function makeCode(options) {
  return new Promise((resolve, reject) => {
    if (options.word) {
      resolve({ error: 'Word codes are not available yet.', code: null })
    } else {
      resolve({ error: null, code: makeNumberCode(options) })
    }
  })
}

function makeNumberCode(options) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let code = ''
  while (code.length < options.digits) {
    const index = Math.floor(Math.random() * digits.length)
    code += digits[index]
    if (!options.repeats) {
      digits.splice(index, 1)
    }
  }
  return code
}

module.exports = { makeCode }
