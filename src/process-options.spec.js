const processOptions = require('./process-options')

describe('options', () => {
  let opts
  let mockProgram

  beforeEach(() => {
    opts = {}
    mockProgram = {
      option: () => mockProgram,
      parse: () => { },
      opts: () => opts
    }
  })

  describe('digits', () => {
    it('plays with "4 digits" by default', () => {
      expect(processOptions(mockProgram).digits).toBe(4)
    })
    ;[3, 4, 5].forEach(input => {
      it(`allows digits to be set to ${input}`, () => {
        opts.digits = `${input}`
        expect(processOptions(mockProgram).digits).toBe(input)
      })
    })
    ;[true, false, undefined, null, 'xxx'].forEach(input => {
      it(`defaults invalid digits value "${input}" to 4`, () => {
        opts.digits = `${input}`
        expect(processOptions(mockProgram).digits).toBe(4)
      })
    })
    it('does not allow digits to be set lower than 3', () => {
      opts.digits = '2'
      expect(processOptions(mockProgram).digits).toBe(3)
    })
    it('does not allow digits to be set higher than 5', () => {
      opts.digits = '6'
      expect(processOptions(mockProgram).digits).toBe(5)
    })
    it('round values inputted for digits', () => {
      opts.digits = '3.21'
      expect(processOptions(mockProgram).digits).toBe(3)
      opts.digits = '4.77'
      expect(processOptions(mockProgram).digits).toBe(5)
      opts.digits = '3.77'
      expect(processOptions(mockProgram).digits).toBe(4)
      opts.digits = '4.21'
      expect(processOptions(mockProgram).digits).toBe(4)
    })
  })

  describe('variation', () => {
    it('sets the variation to "number" by default', () => {
      expect(processOptions(mockProgram).variation).toBe('number')
    })
    it('sets the variation to "number" when variation input is invalid', () => {
      opts.variation = 'invalid'
      expect(processOptions(mockProgram).variation).toBe('number')
    })
    ;['number', 'word'].forEach(input => {
      it(`allows the variation to be set to "${input}"`, () => {
        opts.variation = input
        expect(processOptions(mockProgram).variation).toBe(input)
      })
    })
  })

  describe('repeats', () => {
    it('does not play with repeated digits by default', () => {
      expect(processOptions(mockProgram).repeats).toBe(false)
    })
    it('optionally allows codes with repeated digits', () => {
      opts.repeats = true
      expect(processOptions(mockProgram).repeats).toBe(true)
    })
  })
})
