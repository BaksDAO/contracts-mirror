const { emptyDir } = require("fs-extra");

module.exports = {
  configureYulOptimizer: true,
  onIstanbulComplete: async () => {
    await emptyDir("./typechain");
  },
  istanbulReporter: ["cobertura", "lcov", "text-summary"],
  mocha: {
    reporter: "mocha-junit-reporter",
    reporterOptions: {
      jenkinsMode: true,
    },
  },
};
