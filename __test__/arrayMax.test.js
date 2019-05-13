// tìm array có tổng các phần tử lớn nhất.
const arrayMax = require('../arrayMax.js')
const testArray1 = [0, 2, 30, 5, -9, 1]
const testArray2 = [12, 3, 4, 13, 42, 12]
const emptyArray = []
const nullArray = [null, null, null]

describe('Test arrayMax function', () => {
  test('Normal case', () => {
    expect(arrayMax(testArray1, testArray2)).toEqual(testArray2)
  })

  test('Empty 1 array', () => {
    expect(arrayMax(emptyArray)).toBe(null)
  })

  test('Empty 2 arrays', () => {
    expect(arrayMax(emptyArray, emptyArray)).toBe(null)
  })

  test('Null array', () => {
    expect(arrayMax(nullArray)).toBe(null)
  })

  test('Compare normal array and nullArray', () => {
    expect(arrayMax(testArray1, emptyArray, nullArray)).toEqual(testArray1)
  })
})
