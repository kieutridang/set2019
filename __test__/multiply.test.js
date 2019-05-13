// nhân 2 số
const multiply = require('../multiply.js')

describe('Test multiply function', () => {
  test('if two numbers are 10 and 20 then result should be 200', () => {
    expect(multiply(10, 20)).toBe(200)
  })

  test('if a = 10, b = undefined, result = 10', () => {
    expect(multiply(10)).toBe(10)
  })

  test('if a = 10, b = "xyz", result = 10', () => {
    expect(multiply(10, 'xyz')).toBe(10)
  })

  test('if a = 10, b = "20", result = 200', () => {
    expect(multiply(10, '20')).toBe(200)
  })

  test('if a = undefined, b = 20', () => {
    expect(multiply(undefined, 20)).toBe(20)
  })

  test('if a = undefined, b = undefined, result = 1', () => {
    expect(multiply(undefined, undefined)).toBe(1)
  })
})
