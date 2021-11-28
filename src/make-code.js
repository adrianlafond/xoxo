const WORD_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

let fetch
let lettersCache

function makeCode(options, timeout = 30000) {
  return new Promise(resolve => {
    if (options.word) {
      import('node-fetch').then(async ({ default: fetchModule }) => {
        fetch = fetchModule
        const result = await makeWordCode(options, timeout)
        resolve(result)
      })
      // makeWordCode(options, timeout).then(result => resolve(result))
      // resolve({ error: 'Word codes are not available yet.', code: null })
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

function makeWordCode(options, timeout) {
  console.log('Generating word...')
  let n = 0
  const loading = ['X', ' O', '  X', '   O']
  const loadingInterval = setInterval(() => {
    console.log(loading[n++])
    n %= 4
  }, 500)
  return new Promise(resolve => {
    const handleResolve = result => {
      clearInterval(loadingInterval)
      resolve(result)
    }
    generateWord(handleResolve, options, timeout)
  })
}

function generateWord(resolve, options, timeout) {
  const timer = setTimeout(() => {
    resolve({ error: 'A word code could not be generated. Check your internet connection.', code: null })
  }, timeout)
  const word = getRandomWord(options)
  fetch(`${WORD_API_URL}${word}`).then(response => {
    clearTimeout(timer)
    if (response.status === 200) {
      resolve({ error: null, code: word })
    } else {
      generateWord(resolve, options, timeout)
    }
  })
}

function getRandomWord(options) {
  const letters = getLetters()
  let code = ''

  while (code.length < options.digits) {
    const i = Math.floor(Math.random() * letters.length)
    const c = letters[i]
    if (options.repeats) {
      code += c
    } else {
      if (!code.includes(c)) {
        code += c
      }
    }
  }

  return code
}

// Returns an array of letters with higher-frequency letters represented more
// often according to numbers from https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html
// Creating the array this way will hopefully lead more quicly to real words.
function getLetters() {
  if (lettersCache) {
    return lettersCache
  }
  lettersCache = []
  addLetter('E', 57)
  addLetter('A', 43)
  addLetter('R', 39)
  addLetter('I', 38)
  addLetter('O', 37)
  addLetter('T', 35)
  addLetter('N', 34)
  addLetter('S', 29)
  addLetter('L', 28)
  addLetter('C', 23)
  addLetter('U', 19)
  addLetter('D', 17)
  addLetter('P', 16)
  addLetter('M', 15)
  addLetter('H', 15)
  addLetter('G', 13)
  addLetter('B', 11)
  addLetter('F', 9)
  addLetter('Y', 9)
  addLetter('W', 7)
  addLetter('K', 6)
  addLetter('V', 5)
  addLetter('X', 1)
  addLetter('Z', 1)
  addLetter('J', 1)
  addLetter('Q', 1)
  return lettersCache
}

function addLetter(letter, times) {
  for (let i = 0; i < times; i++) {
    lettersCache.push(letter)
  }
}

module.exports = { makeCode }
