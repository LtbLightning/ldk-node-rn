module.exports = {
  rootDir: './',
  preset: 'react-native',
  setupFiles: ['./__tests__/setup.ts'],
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: false  ,
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 5,
      branches: 5,
      functions: 5,
      lines: 5,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
};
