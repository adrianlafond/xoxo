const defaultOptions = () => ({
  digits: 4,
  variation: 'number',
  repeats: false
})

function parseOptions(program) {
  program
    .option('-d, --digits <type>', 'number of digits or characters')
    .option('-v, --variation <type>', 'number or word variation')
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

function initVariation(optVariation, options) {
  if (optVariation === 'number' || optVariation === 'word') {
    options.variation = optVariation
  }
}

function initRepeats(optRepeats, options) {
  options.repeats = !!optRepeats
}

function processOptions(program) {
  const options = defaultOptions()
  const programOpts = parseOptions(program)

  initDigits(programOpts.digits, options)
  initVariation(programOpts.variation, options)
  initRepeats(programOpts.repeats, options)

  return options
}

module.exports = processOptions
