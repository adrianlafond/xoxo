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
  it('returns null for error if test code is valid', () => {
    const result = breakCode('1234', '1234')
    expect(result.error).toBeNull()
  })
  it('returns appropriate signal given specific test codes', () => {
    expect(breakCode('1234', '1234').signal).toBe('XXXX')
    expect(breakCode('1234', '1235').signal).toBe('XXX-')
    expect(breakCode('1234', '1256').signal).toBe('XX--')
    expect(breakCode('1234', '1567').signal).toBe('X---')
    expect(breakCode('1234', '5678').signal).toBe('----')

    expect(breakCode('1234', '4123').signal).toBe('OOOO')
    expect(breakCode('1234', '3412').signal).toBe('OOOO')
    expect(breakCode('1234', '2341').signal).toBe('OOOO')

    expect(breakCode('1234', '4444').signal).toBe('X---')
    expect(breakCode('1234', '1444').signal).toBe('XX--')
    expect(breakCode('1234', '1244').signal).toBe('XXX-')

    expect(breakCode('1234', '1111').signal).toBe('X---')
    expect(breakCode('1234', '1112').signal).toBe('XO--')
    expect(breakCode('1234', '1123').signal).toBe('XOO-')
  })
})
