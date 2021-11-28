const path = require('path')
const exec = require('child_process').exec

// See https://fireflysemantics.medium.com/unit-testing-commander-scripts-with-jest-bc32465709d6
module.export = (args, cwd = '.') => {
  return new Promise(resolve => {
    args = args.map(a => `${a}`).join(' ')
    exec(
      `node ${path.resolve('./src/xoxo')} ${args}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        })
      }
    )
  })
}
