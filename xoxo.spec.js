const path = require('path')
const exec = require('child_process').exec

describe('xoxo', () => {
  // See https://fireflysemantics.medium.com/unit-testing-commander-scripts-with-jest-bc32465709d6
  function cli (args, cwd) {
    return new Promise(resolve => {
      exec(
        `node ${path.resolve('./xoxo')} ${args.join(' ')}`,
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

  it('results in code 0', async () => {
    const result = await cli([], '.')
    expect(result.code).toBe(0)
  })
})
