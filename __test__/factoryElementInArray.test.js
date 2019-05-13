// tính giai thừa trong các element bên trong mảng.
const factoryElementInArray = require('../factoryElementInArray.js')
const normalArray = [2, 4, 6, 8, 10]
const emptyArray = []
const nullArray = [null, null, null]
const defectedArray = [1, 2, 3, undefined, 4]

describe('Test factoryElementInArray', () => {
  test('Test normal case', () => {
    expect(factoryElementInArray(normalArray)).toEqual([2, 24, 720, 40320, 3628800])
  })

  test('Test emptyArray', () => {
    expect(factoryElementInArray(emptyArray)).toEqual([])
  })

  test('Test null array', () => {
    expect(factoryElementInArray(nullArray)).toEqual([])
  })

  test('Test defected array', () => {
    expect(factoryElementInArray(defectedArray)).toEqual([1, 2, 6, undefined, 24])
  })
})
