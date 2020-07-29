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
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'jest-transform-stub',
  },
};
