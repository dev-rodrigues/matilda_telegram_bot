module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testEnvironment: "node",
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/usecases/*.ts',
    '<rootDir>/src/usecases/converters/*.ts'
  ],
  coverageReporters: [
    'text-summary',
    'lcov'
  ]
};