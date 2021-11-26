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
  const chars = variation === 'number' ? 'digits' : 'characters'
  print(
    `We are playing XOXO with ${digits} ` +
    `${chars} ` +
    `in the "${variation}" variation. ` +
    `Digits ${repeats ? 'can' : 'cannot'} repeat. ` +
    `Type ${digits} ${chars} ` +
    'to hazard a guess, "help" for assistance, "rules" to repeat these rules, or ' +
    '"quit" to quit the game.'
  )
}

function printHelp() {
  const { digits, variation } = options
  const isNum = variation === 'number'
  const char = isNum ? 'digit' : 'character'
  print(
    `Take a crack at the code by entering ${digits} ${char}s. ` +
    'In response, you will be granted some clues:\n' +
    `  * "X" if a ${char} is both in the code in and the correct position;\n` +
    `  * "O" if a ${char} is in the code but not in the correct position;\n` +
    `  * "-" if a ${char} is not in the code at all.\n` +
    `For example, if the code is "${isNum ? '1234' : 'HEAR'}" ` +
    `and you enter "${isNum ? '8247' : 'BETA'}" then the ` +
    `response would be "${isNum ? 'XO--' : 'XO--'}" because ` +
    `${isNum ? '2' : 'E'} is in the code and in the correct position ("X"), ` +
    `${isNum ? '4' : 'A'} is in the code but in the wrong position ("O"), ` +
    `and the remaining ${char}s are not in the code ("-").`
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
