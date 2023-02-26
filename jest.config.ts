import path from 'path'
import { Config } from 'jest'

const fromRoot = (d: string) => path.join(__dirname, d)
const config: Config = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    // Avoid coverage from:
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/reportWebVitals.ts',
    '!**/index.ts',
    '!**/hooks.ts',
    '!**/store.ts',
    '!**/types/**',
  ],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  rootDir: './',
  setupFilesAfterEnv: [fromRoot('src/setupTests.ts')],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.spec.(tx|tsx|js)'],
  testTimeout: 30000,
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
}

export default config
