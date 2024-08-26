/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  rootDir: '..',
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  reporters: [
    "default",
    [
        "<rootDir>/node_modules/jest-html-reporter",
        {
          pageTitle: "Test Report",
          includeFailureMsg: true,
          includeSuiteFailure: true,
          outputPath: './jest/test-report.html'
        }
    ]
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
  },
  testMatch: [
    '<rootDir>/src/**/*.test.tsx'
  ]
};