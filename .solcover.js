const { emptyDir } = require("fs-extra");

module.exports = {
  configureYulOptimizer: true,
  onIstanbulComplete: async () => {
    await emptyDir("./src/types/");
  },
  istanbulReporter: ["cobertura", "lcov", "text-summary"],
};
