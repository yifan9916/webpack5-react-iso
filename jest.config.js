module.exports = {
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>__tests__/setup-tests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/src/**/*(*.)@(spec|test).(ts|js)?(x)',
    '<rootDir>/src/**/__tests__/**/*(*.)@(spec|test).(ts|js)?(x)',
    '<rootDir>/__tests__/**/*(*.)@(spec|test).(ts|js)?(x)',
  ],
};
