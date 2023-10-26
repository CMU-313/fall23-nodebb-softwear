// @ts-nocheck
module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  reporters: ["default"],
  coverageReporters: ["text", "text-summary"],
  collectCoverage: true,
  testMatch: ["<rootDir>/test/**/**.js"], // Adjust the pattern to match your test file naming conventions
  testPathIgnorePatterns: [
    "node_modules",
    "public/src/modules",
    "src/admin"
  ]
};
