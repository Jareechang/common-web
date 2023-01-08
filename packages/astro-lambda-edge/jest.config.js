module.exports = {
  preset: 'ts-jest',
  rootDir: ".",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    'node_modules/',
    'dist'
  ],
  setupFiles: [
    '<rootDir>/setupTests.js'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
