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
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(scss|css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      fromRoot('src/__tests__/__mocks__/cssStub.js'),
  },
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
