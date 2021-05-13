import { emptyDir, remove } from "fs-extra";
import { TASK_CLEAN } from "hardhat/builtin-tasks/task-names";
import { task } from "hardhat/config";

task(
  TASK_CLEAN,
  "Clears the cache and deletes all artifacts",
  async (taskArgs, _hre, runSuper) => {
    await emptyDir("./coverage/");
    await remove("./coverage.json");
    await remove("./gasReporterOutput.json");

    return await runSuper(taskArgs);
  },
);
