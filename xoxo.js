#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('./package.json')

const program = new Command()

const defaultOptions = () => ({
  digits: 4,
  variation: 'number',
  repeats: false
})
const options = defaultOptions()

function print(message) {
  console.log(message)
}

function processOptions() {
  program
    .option('-d, --digits <type>', 'number of digits or characters')
    .option('-v, --variation <type>', 'number or word variation')
    .option('-r, --repeats', 'digits or characters can repeat')

  program.parse()

  const programOpts = program.opts()
  initDigits(programOpts.digits)
  initVariation(programOpts.variation)
  initRepeats(programOpts.repeats)
}

function initDigits(optDigits) {
  const digits = +optDigits
  if (!isNaN(digits)) {
    options.digits = Math.max(3, Math.min(5, Math.round(digits)))
  }
}

function initVariation(optVariation) {
  if (optVariation === 'number' || optVariation === 'word') {
    options.variation = optVariation
  }
}

function initRepeats(optRepeats) {
  options.repeats = optRepeats
}

function start() {
  program.version(pkg.version)
  processOptions()
  print('' +
    `We are playing XOXO with ${options.digits} ` +
    `${options.variation === 'number' ? 'digits' : 'characters'} ` +
    `in the "${options.variation}" variation. ` +
    `${options.repeats ? 'Digits can repeat. ' : ''}` +
    'Good luck!'
  )
}

start()
