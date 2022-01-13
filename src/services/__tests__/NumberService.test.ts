import NumberService from '../NumberService'

describe('Number service tests', () => {
  it('should convert all types', () => {
    const without = NumberService.formatNumber(56, 2)
    const thousands = NumberService.formatNumber(50_452, 1)
    const millions = NumberService.formatNumber(12_152_562)
    const billions = NumberService.formatNumber(33_003_000_000, 5)
    const trillions = NumberService.formatNumber(666_666_666_666_666, 0)
    const quadrillions = NumberService.formatNumber(170_170_100_000_000_000, 4)

    expect(without).toBe('56')
    expect(thousands).toBe('50.5k')
    expect(millions).toBe('12.15M')
    expect(billions).toBe('33.003B')
    expect(trillions).toBe('667T')
    expect(quadrillions).toBe('170.1701Q')
  })

  it('should return zero on negative input', () => {
    const result = NumberService.formatNumber(-5, 0)

    expect(result).toBe('0')
  })
})
