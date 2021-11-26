const cli = require('./mock-cli')

xdescribe('xoxo >', () => {
  it('results in code 0', async () => {
    const result = await cli([])
    expect(result.code).toBe(0)
  })
  it('prints "XOXO" to stdout', async () => {
    const result = await cli([])
    console.log(result)
    expect(result.stdout.includes('XOXO')).toBe(true)
  })
})
