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
  const { digits, word, repeats, attempts } = options
  const chars = word ? 'characters' : 'digits'
  print(
    `We are playing XOXO with ${digits} ` +
    `${chars} ` +
    `in the "${word ? 'word' : 'number'}" variation. ` +
    `${word ? 'Characters' : 'Digits'} ${repeats ? 'can' : 'cannot'} repeat. ` +
    `You have ${attempts} attempts to break the code. ` +
    `Type ${digits} ${chars} ` +
    'to hazard a guess, "help" for assistance, "rules" to repeat these rules, or ' +
    '"quit" to quit the game.'
  )
}

function printHelp() {
  const { digits, word } = options
  const char = word ? 'character' : 'digit'
  print(
    `Take a crack at the code by entering ${digits} ${char}s. ` +
    'In response, you will be granted some clues:\n' +
    `  * "X" if a ${char} is both in the code in and the correct position;\n` +
    `  * "O" if a ${char} is in the code but not in the correct position;\n` +
    `  * "-" if a ${char} is not in the code at all.\n` +
    `For example, if the code is "${word ? 'HEAR' : '1234'}" ` +
    `and you enter "${word ? 'BETA' : '8247'}" then the ` +
    'response would be "XO--" because ' +
    `${word ? 'E' : '2'} is in the code and in the correct position ("X"), ` +
    `${word ? 'A' : '4'} is in the code but in the wrong position ("O"), ` +
    `and the remaining ${char}s are not in the code ("-").\n` +
    'When starting a new game these options are available:\n' +
    '  * -w --word     The code will be a word instead of a number\n' +
    '  * -d --digits   Length of the code, from 3 to 5; default is 4\n' +
    `  * -r --repeats  The code can have repeating ${char}s\n` +
    '  * -a --attempts Number of attemps to break the code; default is 12'
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
    case 'rules':
    case 'r':
      printRules()
      requestInput()
      break
    case 'help':
    case 'h':
      printHelp()
      requestInput()
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
