const Geometric = require('../geoMetric.js')

describe('Test geometric class', () => {
  test('Test constructor', () => {
    const geoMetric = new Geometric(10, 20, 30)
    expect(geoMetric.width).toBe(10)
    expect(geoMetric.height).toBe(20)
    expect(geoMetric.length).toBe(30)
  })

  test('Test calculate perimeter', () => {
    const geoMetric = new Geometric(10, 20, 30)
    expect(geoMetric.getPerimeter()).toBe(240)
  })

  test('Test calculate area', () => {
    const geoMetric = new Geometric(10, 20, 30)
    expect(geoMetric.getArea()).toBe(2200)
  })

  test('Test calculate volume', () => {
    const geoMetric = new Geometric(10, 20, 30)
    expect(geoMetric.getVolume()).toBe(6000)
  })
})