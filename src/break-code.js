function breakCode(code, test, repeats = false, isWord = false) {
  if (isTestValid(code, test, isWord)) {
    return {
      error: null,
      signal: writeSignal(code, test, repeats)
    }
  } else {
    return {
      error: isWord
        ? `The test code must be a ${code.length}-letter word composed only of letters A-Z.`
        : `The test code must be composed of exactly ${code.length} numbers.`,
      signal: null
    }
  }
}

function writeSignal(codeStr, testStr) {
  let signal = ''
  const code = codeStr.split('')
  const test = testStr.split('')

  // Find correct digits in correct positions.
  for (let i = code.length - 1; i >= 0; i--) {
    if (code[i] === test[i]) {
      signal += 'X'
      code.splice(i, 1)
      test.splice(i, 1)
    }
  }

  // Find correct digits in incorrect positions.
  for (let i = test.length - 1; i >= 0; i--) {
    const codeIndex = code.indexOf(test[i])
    if (codeIndex !== -1) {
      signal += 'O'
      code.splice(codeIndex, 1)
      test.splice(i, 1)
    }
  }

  // Fill the remaining positions with "-".
  while (signal.length < codeStr.length) {
    signal += '-'
  }

  return signal
}

function isTestValid(code, test, isWord) {
  if (isWord) {
    return new RegExp(`^\\[a-z]{${code.length}}$`, 'i').test(test)
  }
  return new RegExp(`^\\d{${code.length}}$`).test(test)
}

module.exports = { breakCode }
