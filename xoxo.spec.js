const path = require('path')
const exec = require('child_process').exec

describe('xoxo >', () => {
  // See https://fireflysemantics.medium.com/unit-testing-commander-scripts-with-jest-bc32465709d6
  function cli(args, cwd = '.') {
    return new Promise(resolve => {
      args = args.map(a => `${a}`).join(' ')
      exec(
        `node ${path.resolve('./xoxo')} ${args}`,
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
    const result = await cli([])
    expect(result.code).toBe(0)
  })
  it('prints "XOXO" to stdout', async () => {
    const result = await cli([])
    expect(result.stdout.includes('XOXO')).toBe(true)
  })

  describe('digits options', () => {
    it('plays with "4 digits" by default', async () => {
      const result = await cli([])
      expect(result.stdout.includes('4 digits')).toBe(true)
    })
    ;[3, 4, 5].forEach(input => {
      it(`allows digits to be set to ${input} with "-d"`, async () => {
        const result = await cli(['-d', input])
        expect(result.stdout.includes(`${input} digits`)).toBe(true)
      })
      it(`allows digits to be set to ${input} with "--digits"`, async () => {
        const result = await cli(['--digits', input])
        expect(result.stdout.includes(`${input} digits`)).toBe(true)
      })
    })
    ;[true, false, undefined, null, 'xxx'].forEach(input => {
      it(`defaults invalid digits value "${input}" to 4`, async () => {
        const result = await cli(['-d', input])
        expect(result.stdout.includes('4 digits')).toBe(true)
      })
    })
    it('does not allow digits to be set lower than 3', async () => {
      const result = await cli(['-d', 2])
      expect(result.stdout.includes('3 digits')).toBe(true)
    })
    it('does not allow digits to be set higher than 5', async () => {
      const result = await cli(['-d', 6])
      expect(result.stdout.includes('5 digits')).toBe(true)
    })
    it('round values inputted for digits', async () => {
      const result1 = await cli(['-d', 3.21])
      expect(result1.stdout.includes('3 digits')).toBe(true)
      const result2 = await cli(['-d', 4.77])
      expect(result2.stdout.includes('5 digits')).toBe(true)
      const result3 = await cli(['-d', 3.77])
      expect(result3.stdout.includes('4 digits')).toBe(true)
      const result4 = await cli(['-d', 4.21])
      expect(result4.stdout.includes('4 digits')).toBe(true)
    })
  })

  describe('variation option', () => {
    it('sets the variation to "number" by default', async () => {
      const result = await cli([])
      expect(result.stdout.includes('"number" variation')).toBe(true)
    })
    it('sets the variation to "number" when variation input is invalid', async () => {
      const result = await cli(['--variation', 'invalid'])
      expect(result.stdout.includes('"number" variation')).toBe(true)
    })
    ;['number', 'word'].forEach(input => {
      it(`allows the variation to be set to "${input}" with "-v"`, async () => {
        const result = await cli(['-v', input])
        expect(result.stdout.includes(`"${input}" variation`)).toBe(true)
      })
      it(`allows the variation to be set to "${input}" with "--variation"`, async () => {
        const result = await cli(['--variation', input])
        expect(result.stdout.includes(`"${input}" variation`)).toBe(true)
      })
    })
  })

  describe('repeats option', () => {
    it('does not play with repeated digits by default', async () => {
      const result = await cli([])
      expect(result.stdout.includes('Digits can repeat.')).toBe(false)
    })
    it('optionally allows codes with repeated digits with "-r"', async () => {
      const result = await cli(['-r'])
      expect(result.stdout.includes('Digits can repeat.')).toBe(true)
    })
    it('optionally allows codes with repeated digits with "--repeats"', async () => {
      const result = await cli(['--repeats'])
      expect(result.stdout.includes('Digits can repeat.')).toBe(true)
    })
  })
})
