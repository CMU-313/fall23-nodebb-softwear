// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "mocha",
  testRunner_comment:
    "Take a look at (missing 'homepage' URL in package.json) for information about the mocha plugin.",
  coverageAnalysis: "off",
  ignorePatterns: ['build/public/plugins/nodebb-plugin-emoji', 
                   'build/public/plugins/nodebb-plugin-markdown/styles', 
                   'build/public/plugins/nodebb-rewards-essentials/static',
                   'test/controllers.js',
                   'test/plugins.js',
                   'test/build.js',
                   'test/search.js',
                   'test/upgrade.js'],
  mutate: ["src/posts/*.js"]
  // mutate: ['public/src/**/*.js', 'src/**/*.js', 'test/**/*.js']
};
export default config;
