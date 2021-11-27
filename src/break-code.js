function breakCode(code, test, isWord = false) {
  if (isTestValid(code, test, isWord)) {
    return { error: null, signal: 'XOXO' }
  } else {
    return {
      error: isWord
        ? `The test code must be a ${code.length}-letter word composed only of letters A-Z.`
        : `The test code must be composed of exactly ${code.length} numbers.`,
      signal: null
    }
  }
}

function isTestValid(code, test, isWord) {
  if (isWord) {
    return new RegExp(`^\\[a-z]{${code.length}}$`, 'i').test(test)
  }
  return new RegExp(`^\\d{${code.length}}$`).test(test)
}

module.exports = { breakCode }
