import { formatNumber } from 'shared/lib'

describe('Number service tests', () => {
  it('should convert all types', () => {
    const withoutSuffix = formatNumber(56, 2)
    const thousands = formatNumber(50_452, 1)
    const millions = formatNumber(12_152_562)
    const billions = formatNumber(33_003_000_000, 5)
    const trillions = formatNumber(666_666_666_666_666, 0)
    const quadrillions = formatNumber(170_170_100_000_000_000, 4)

    expect(withoutSuffix).toBe('56')
    expect(thousands).toBe('50.5k')
    expect(millions).toBe('12.15M')
    expect(billions).toBe('33.003B')
    expect(trillions).toBe('667T')
    expect(quadrillions).toBe('170.1701Q')
  })

  it('should return zero on negative input', () => {
    const result = formatNumber(-5, 0)

    expect(result).toBe('0')
  })
})
