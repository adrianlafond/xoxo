#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')
const processOptions = require('./process-options')

const program = new Command()
const options = processOptions(program)
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function print(message) {
  console.log(message)
}

function printRules() {
  const { digits, variation, repeats } = options
  print(
    `We are playing XOXO with ${digits} ` +
    `${variation === 'number' ? 'digits' : 'characters'} ` +
    `in the "${variation}" variation. ` +
    `Digits ${repeats ? 'can' : 'cannot'} repeat.\n` +
    `Type ${options.digits} ${variation === 'number' ? 'digits' : 'characters'} ` +
    'to hazard a guess, "help" for assistance, "rules" to repeat these rules, or ' +
    '"quit" to quit the game.'
  )
}

function requestInput() {
  readline.question('? ', handleInput)
}

function quit() {
  readline.close()
  print('Bye!')
  process.exit()
}

function handleInput(inputRaw) {
  const input = inputRaw.toString().toLowerCase()
  switch (input) {
    case 'quit':
    case 'q':
      quit()
      break
    default:
      print(`You typed ${input.toString()}`)
      readline.close()
  }
}

function start() {
  program.version(pkg.version)
  printRules()
  requestInput()
}

start()
