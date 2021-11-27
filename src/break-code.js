function breakCode(code, test, isWord = false) {
  if (isTestValid(code, test, isWord)) {
    //
  } else {
    return {
      error: `The test code "${test}" is not a valid for the current rules of the game.`,
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
