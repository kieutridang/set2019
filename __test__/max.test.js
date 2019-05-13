// tìm phần tử lớn nhất trong array.
const max = require('../max.js')
const normalArray = [1, 3, 4, 5, 9, 10]
const emptyArray = []
const nullArray = [null, null]
const defectedArray = [undefined, 2, 4, -5, null, 9, 3, 4]

describe('Test max function', () => {
  test('Test normal case', () => {
    expect(max(normalArray)).toBe(10)
  })

  test('Test empty array', () => {
    expect(max(emptyArray)).toBe(null)
  })

  test('Test null array', () => {
    expect(max(nullArray)).toBe(null)
  })

  test('Test defected array', () => {
    expect(max(defectedArray)).toBe(9)
  })
})
