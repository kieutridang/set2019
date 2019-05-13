// kiểm tra hàm tồng 2 số
const sum = require('../sum.js')

describe('Test sum function', () => {
  test('if two numbers are 10 and 20 then result should be 30', () => {
    expect(sum(10, 20)).toBe(30)
  })

  test('if a = 10, b = undefined, result = 10', () => {
    expect(sum(10)).toBe(10)
  })

  test('if a = 10, b = "xyz", result = 10', () => {
    expect(sum(10, 'xyz')).toBe(10)
  })

  test('if a = 10, b = "20", result = 30', () => {
    expect(sum(10, '20')).toBe(30)
  })

  test('if a = undefined, b = 20', () => {
    expect(sum(undefined, 20)).toBe(20)
  })

  test('if a = undefined, b = undefined, result = 0', () => {
    expect(sum(undefined, undefined)).toBe(0)
  })
})
