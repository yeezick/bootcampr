module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!**/node_modules/**'],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: '.',
  testMatch: ['**/__tests__/**/*.spec.(tx|tsx|js)'],
  testTimeout: 30000,
}
