import { getEnvVar } from 'shared/config'

describe('configService test', () => {
  let key: string, envValue: string, missingKey: string
  const initialEnv = process.env

  beforeEach(() => {
    key = 'key'
    envValue = 'value'
    missingKey = 'missing key'
    process.env[key] = envValue
  })

  afterEach(() => {
    process.env = initialEnv
  })

  it('getValue should return value from env', () => {
    const value = getEnvVar(key)

    expect(value).toBe(envValue)
  })

  it('getValue should throw on missing env key', () => {
    const value = () => getEnvVar(missingKey)

    expect(value).toThrow(`Missing env variable ${missingKey}`)
  })

  it('getValue should not throw on empty value', () => {
    process.env[missingKey] = ''
    const value = getEnvVar(missingKey)

    expect(value).toBe('')
  })
})
