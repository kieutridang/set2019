// tính giai thừa 1 số.
const factory = require('../factory.js')

describe('Test factory function', () => {
  test('Normal case', () => {
    expect(factory(10)).toBe(3628800)
  })

  test('Zero case', () => {
    expect(factory(0)).toBe(1)
  })

  test('String', () => {
    expect(factory('abc')).toBeNaN()
  })

  test('Undefined', () => {
    expect(factory()).toBeNaN()
  })
})
