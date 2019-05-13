// tổng các element trong các array
const elementsInArraySum = require('../elementsInArraySum.js')
const testArray = [1, 2, 3, 4, 5, 6]
const defectedArray = [1, 2, 3, 4, 5, undefined]
const emptyArray = []
const nullArray = [null, null, null]

describe('Test elementsInArraySum function', () => {
  test('Normal case', () => {
    expect(elementsInArraySum(testArray)).toBe(21)
  })

  test('Empty array', () => {
    expect(elementsInArraySum(emptyArray)).toBe(null)
  })

  test('Null Array', () => {
    expect(elementsInArraySum(nullArray)).toBe(null)
  })

  test('Array has undefined element', () => {
    expect(elementsInArraySum(defectedArray)).toBe(15)
  })
})
