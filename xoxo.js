const { Command } = require('commander');
const pkg = require('./package.json');

const program = new Command();
program.version(pkg.version);

console.log('Hello, world!');

