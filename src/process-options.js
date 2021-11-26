const defaultOptions = () => ({
  digits: 4,
  word: false,
  repeats: false,
  attempts: 12
})

function parseOptions(program) {
  program
    .option('-d, --digits <value>', 'number of digits or characters')
    .option('-w, --word', 'writes the code as a word')
    .option('-r, --repeats', 'digits or characters can repeat')
    .option('-a, --attempts <value>', 'attemps allowed to break the code')
  program.parse()
  return program.opts()
}

function initDigits(optDigits, options) {
  const digits = +optDigits
  if (!isNaN(digits)) {
    options.digits = Math.max(3, Math.min(5, Math.round(digits)))
  }
}

function initWord(optWord, options) {
  options.word = !!optWord
}

function initRepeats(optRepeats, options) {
  options.repeats = !!optRepeats
}

function initAttempts(optAttempts, options) {
  const attempts = +optAttempts
  if (!isNaN(attempts)) {
    options.attempts = Math.max(1, Math.round(attempts))
  }
}

function processOptions(program) {
  const options = defaultOptions()
  const programOpts = parseOptions(program)

  initDigits(programOpts.digits, options)
  initWord(programOpts.word, options)
  initRepeats(programOpts.repeats, options)
  initAttempts(programOpts.attempts, options)

  return options
}

module.exports = processOptions
