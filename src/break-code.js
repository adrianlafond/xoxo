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

function writeSignal(code, test, repeats) {
  const signal = []
  for (let i = 0; i < test.length; i++) {
    const t = test[i]
    if (!code.includes(t)) {
      // Test digit is not in the code.
      signal.push('-')
    } else {
      const c = code[i]
      if (c === t) {
        // Test digit is in the correct position.
        signal.push('X')
      } else {
        // Count the number of instances of the test digit before the current
        // instance in the test code. They will already have been accounted for
        // so we can ignore them.
        let priorT = 0
        for (let j = 0; j < i; j++) {
          if (test[j] === t) {
            priorT += 1
          }
        }
        if (priorT === 0) {
          // Because we know the test digit is in the code but there are no
          // prior instances we need to account for, we can immediately mark it
          // as "O".
          signal.push('O')
        } else {
          let countT = 0
          for (let j = 0; j < code.length; j++) {
            if (code[j] === t) {
              countT += 1
              if (countT > priorT) {
                // All prior instances of the test digit in the code have been
                // accounted for so this instance must match the test digit.
                signal.push('O')
                break
              }
            }
          }
          if (countT <= priorT) {
            // There are no more unaccounted-for instances of the test digit in
            // the code, which means the test digit does not match any
            // remaining digits in the code.
            signal.push('-')
          }
        }
      }
    }
  }
  signal.sort(sortSignal)
  return signal.join('')
}

function sortSignal(a, b) {
  if (a === b) return 0
  if ((a === 'X' && b !== 'X') || (a === 'O' && b === '-')) {
    return -1
  }
  return 1
}

function isTestValid(code, test, isWord) {
  if (isWord) {
    return new RegExp(`^\\[a-z]{${code.length}}$`, 'i').test(test)
  }
  return new RegExp(`^\\d{${code.length}}$`).test(test)
}

module.exports = { breakCode }
