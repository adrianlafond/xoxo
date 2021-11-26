const defaultOptions = () => ({
  digits: 4,
  word: false,
  repeats: false
})

function parseOptions(program) {
  program
    .option('-d, --digits <type>', 'number of digits or characters')
    .option('-w, --word', 'writes the code as a word')
    .option('-r, --repeats', 'digits or characters can repeat')
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

function processOptions(program) {
  const options = defaultOptions()
  const programOpts = parseOptions(program)

  initDigits(programOpts.digits, options)
  initWord(programOpts.word, options)
  initRepeats(programOpts.repeats, options)

  return options
}

module.exports = processOptions
