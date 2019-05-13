// nhân các element trong array.
const elementsInArrayMultiply = require('../elementsInArrayMultiply.js')
const array1 = [1, 2, 3, 4, 5]
const emptyArray = []
const nullArray = [null, null]
const defectedArray = [1, 2, undefined, 3]

describe('Test elementsInArrayMultiply', () => {
  test('Test normal case', () => {
    expect(elementsInArrayMultiply(array1)).toBe(120)
  })

  test('Test empty array', () => {
    expect(elementsInArrayMultiply(emptyArray)).toBe(1)
  })

  test('Test null array', () => {
    expect(elementsInArrayMultiply(nullArray)).toBe(1)
  })

  test('Test defectedArray', () => {
    expect(elementsInArrayMultiply(defectedArray)).toBe(6)
  })
})
