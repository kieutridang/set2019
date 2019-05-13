// sắp xếp từ nhỏ tới lớn.
const sortFromSmall = require('../sortFromSmall.js')
const normalArray = [9, -4, 2, 1, 12, 7, 0]
const emptyArray = []
const nullArray = [null, null, null]
const defectedArray = [null, 2, undefined, 7, 12, 6, undefined]

describe('Test sort from small', () => {
  test('Normal case', () => {
    expect(sortFromSmall(normalArray)).toEqual([-4, 0, 1, 2, 7, 9, 12])
  })

  test('Empty array', () => {
    expect(sortFromSmall(emptyArray)).toEqual([])
  })

  test('Null array', () => {
    expect(sortFromSmall(nullArray)).toEqual([null, null, null])
  })

  test('Defected array', () => {
    expect(sortFromSmall(defectedArray)).toEqual([undefined, undefined, null, 2, 6, 7, 12])
  })
})
