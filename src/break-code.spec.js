const { breakCode } = require('./break-code')

describe('breakCode', () => {
  it('returns error if non-number characters are tested against a number code', () => {
    const result = breakCode('1234', '12A4')
    expect(result.signal).toBeNull()
    expect(result.error).toBeTruthy()
    expect(typeof result.error).toBe('string')
  })
  it('returns error if non-alphabetical characters are tested against a word code', () => {
    const result = breakCode('abcd', 'ab1d')
    expect(result.signal).toBeNull()
    expect(result.error).toBeTruthy()
    expect(typeof result.error).toBe('string')
  })
  it('returns error if the test is shorter than the code', () => {
    const result = breakCode('1234', '123')
    expect(result.signal).toBeNull()
    expect(result.error).toBeTruthy()
    expect(typeof result.error).toBe('string')
  })
  it('returns error if the test is longer than the code', () => {
    const result = breakCode('1234', '12345')
    expect(result.signal).toBeNull()
    expect(result.error).toBeTruthy()
    expect(typeof result.error).toBe('string')
  })
})
