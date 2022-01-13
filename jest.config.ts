import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}

export default config
