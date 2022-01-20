const lookup = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'Q' },
]

export function formatNumber(number: number, digits = 2): string {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = [...lookup].reverse().find((item) => number >= item.value)
  return item
    ? (number / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
