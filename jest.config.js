export default {
  preset: 'ts-jest/presets/default-esm-legacy',
  verbose: true,
  testEnvironment: 'node',
  transformIgnorePatterns: ['./node_modules/'],
  extensionsToTreatAsEsm: [".ts"],
  roots: [
    "tests",
  ],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      "useESM": true
    }
  },
  modulePathIgnorePatterns: [
    "./build"
  ],
}