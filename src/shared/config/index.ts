import './registerFontAwesome'

export const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Missing env variable ${key}`)
  }
  return process.env[key] || ''
}

export const API_KEY = getEnvVar('REACT_APP_RAPIDAPI_KEY')

export const NODE_ENV = getEnvVar('NODE_ENV')
export const isDevEnv = NODE_ENV === 'development'
export const isProdEnv = NODE_ENV === 'production'
