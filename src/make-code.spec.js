const fetchMock = require('jest-fetch-mock')
const { makeCode } = require('./make-code')
const { defaultOptions } = require('./process-options')

describe('makeCode', () => {
  let options

  beforeEach(() => {
    options = defaultOptions()
  })

  function doesNotRepeat(code) {
    const tmp = []
    return code.split('').every(c => {
      if (tmp.includes(c)) {
        return false
      }
      tmp.push(c)
      return true
    })
  }

  describe('number', () => {
    it('returns a number code of 4 non-repeating digits by default', async () => {
      const result = await makeCode(options)
      expect(result.error).toBeNull()
      expect(result.code.length).toBe(4)
      expect(/^\d{4}$/.test(result.code)).toBe(true)
      expect(doesNotRepeat(result.code)).toBe(true)
    })
    ;[3, 4, 5].forEach(n => {
      it(`can return a number code of ${n} non-repeating digits`, async () => {
        options.digits = n
        // 1000 codes to maximum chances of uncovering a code with a repeating digit.
        for (let i = 0; i < 1000; i++) {
          const result = await makeCode(options)
          expect(result.error).toBeNull()
          expect(result.code.length).toBe(n)
          expect(new RegExp(`^\\d{${n}}$`).test(result.code)).toBe(true)
          expect(doesNotRepeat(result.code)).toBe(true)
        }
      })
      it(`can return a number code of ${n} repeating digits`, async () => {
        options.digits = n
        options.repeats = true
        let repeatedDigit = false
        // 1000 codes to maximum chances of uncovering a code with a repeating digit.
        for (let i = 0; i < 1000; i++) {
          const result = await makeCode(options)
          expect(result.code.length).toBe(n)
          expect(new RegExp(`^\\d{${n}}$`).test(result.code)).toBe(true)
          if (!doesNotRepeat(result.code)) {
            repeatedDigit = true
            break
          }
        }
        expect(repeatedDigit).toBe(true)
      })
    })
  })

  // Tests disabled because they must be updated to account to alter async functionality.
  xdescribe('word', () => {
    beforeEach(() => {
      options.word = true
      fetchMock.resetMocks()
    })

    describe('success', () => {
      beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify([{ word: 'MILK' }]))
      })

      it('returns a word code of 4 non-repeating chars by default', async () => {
        const result = await makeCode(options)
        expect(result.error).toBeNull()
        expect(result.code.length).toBe(4)
        expect(/^[a-z]{4}$/i.test(result.code)).toBe(true)
        expect(doesNotRepeat(result.code)).toBe(true)
      })
    })

    describe('error', () => {
      beforeEach(() => {
        fetchMock.mockResponseOnce(() => new Promise(resolve => setTimeout(() => resolve(''), 200)))
      })

      it('returns an error if no connection to the API can be made', async () => {
        const result = await makeCode(options, 100)
        expect(result.error).toBeTruthy()
        expect(typeof result.error).toBe('string')
        expect(result.code).toBeNull()
      })
    })
  })
})
