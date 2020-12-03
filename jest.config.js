module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}',
    '!src/**/*.test.ts',
    '!src/icons/*.*',
    '!src/constants/**/*.*',
  ],
  coverageReporters: ['html', 'text-summary', 'cobertura', 'lcov'],
  testMatch: ['**/src/**/*.test.(js|ts)'],
  clearMocks: true,
  moduleNameMapper: {
    '^.+.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  watchPathIgnorePatterns: ['/node_modules/'],
};
