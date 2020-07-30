module.exports = {
  collectCoverageFrom: ['**/*.ts', '**/*.tsx', '!**/*.d.ts'],
  coverageThreshold: {
    global: {
      statements: 6,
      branches: 5,
      lines: 6,
      functions: 6,
    },
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'jest-transform-stub',
  },
};
