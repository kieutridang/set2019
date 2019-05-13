// tổng các array
const arraySum = require('../arraySum.js')
const testArray1 = [1, 2, 3, 4, 5] // sum = 15
const testArray2 = [2, 4, 6, 8, 10] // sum = 30
const testArray3 = [3, 6, 9, 12] // sum = 30
const defectedArray = [1, undefined, 3, 4] // sum = 8

const emptyArray = []
const nullArray = [null, null]

describe('Test arraySum function', () => {
  test('Test normal case', () => {
    expect(arraySum(testArray1, testArray2, testArray3)).toBe(75)
  })

  test('Test defectedArray', () => {
    expect(arraySum(testArray1, defectedArray)).toBe(23)
  })

  test('Test empty array', () => {
    expect(arraySum(emptyArray)).toBe(0)
  })

  test('Test null array', () => {
    expect(arraySum(nullArray)).toBe(0)
  })
})
