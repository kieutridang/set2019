// tìm phần tử lớn nhất trong các array.
const maxInArray = require('../maxInArray.js')
const normalArray1 = [1, 3, 4, 5, 9, 10]
const normalArray2 = [2, 6, 8, 11, 20, -5]
const emptyArray = []
const nullArray = [null, null]
const defectedArray = [undefined, 2, 4, -5, null, 9, 3, 4]

describe('Test max function', () => {
  test('Test normal case', () => {
    expect(maxInArray(normalArray1, normalArray2)).toBe(20)
  })

  test('Test normal case with defected array', () => {
    expect(maxInArray(normalArray2, defectedArray)).toBe(20)
  })

  test('Test empty array', () => {
    expect(maxInArray(emptyArray)).toBe(null)
  })

  test('Test null array', () => {
    expect(maxInArray(nullArray)).toBe(null)
  })

  test('Test defected array', () => {
    expect(maxInArray(defectedArray)).toBe(9)
  })
})
