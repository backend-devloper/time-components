const path = require('path');
const fs = require('fs');

const buildConfig = dir => {
  const { name: packageName } = JSON.parse(
    fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
  );
  const name = packageName.replace('@times-components/', '');
  return {
    rootDir: path.join(dir, '../..'),
    preset: 'react-native-web',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'node', 'json'],
    transformIgnorePatterns: [],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    setupFiles: [],
    testMatch: [
      `**/packages/${name}/**/__tests__/*.test.tsx`,
      `**/packages/${name}/**/__tests__/*.test.ts`
    ],
    transform: {
      '.+\\.js$': './node_modules/react-native/jest/preprocessor.js',
      '.+\\.tsx?$': 'ts-jest'
    },
    globals: {
      'ts-jest': {
        tsConfig: './tsconfig.jest.json'
      }
    },
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov', 'text'],
    coverageDirectory: path.join(dir, 'coverage'),
    collectCoverageFrom: [
      '<rootDir>/packages/ts-styleguide/src/**/*.(tsx|ts)',
      '!<rootDir>/packages/ts-styleguide/src/**/*.(stories|d).*',
      '!<rootDir>/packages/ts-styleguide/src/index.*',
      '!<rootDir>/packages/ts-styleguide/src/fixtures/**',
      '!<rootDir>/node_modules/'
    ],
    coverageThreshold: {
      global: {
        statements: 9,
        branches: 80,
        lines: 96,
        functions: 90
      }
    }
  };
};

module.exports = buildConfig(__dirname);