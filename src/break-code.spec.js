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
  it('returns "XXXX" if the test matches the code', () => {
    const result = breakCode('1234', '1234')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('XXXX')
  })
  it('returns "----" if no digit in the test matches the code', () => {
    const result = breakCode('1234', '5678')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('----')
  })
  it('returns "XX--" if some digits are in the correct position but others are not in the code', () => {
    const result = breakCode('1234', '5634')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('XX--')
  })
  it('returns "XOO-" if a digit is in the correct position and two are in the ' +
    'code but not in the correct position', () => {
    const result = breakCode('1234', '0324')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('XOO-')
  })
  it('returns "XXOO" if "repeats" is true and two digits are in the correct positions ' +
    'and two are in the code but not in the correct position', () => {
    const result = breakCode('2234', '3224')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('XXOO')
  })
  it('returns "X---" for code "5029" and test code "5555"', () => {
    const result = breakCode('5029', '5555')
    expect(result.error).toBeNull()
    expect(result.signal).toBe('X---')
  })
})
