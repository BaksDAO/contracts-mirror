import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const core = await deployments.get("Core");

  const developmentFund = await deploy("DevelopmentFund", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [core.address],
        },
      },
    },
    log: true,
  });

  if (developmentFund.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setDevelopmentFund",
      developmentFund.address,
    );
  }
};
deploy.dependencies = ["Core"];
deploy.tags = ["DevelopmentFund"];

export default deploy;
