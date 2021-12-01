import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const core = await deployments.get("Core");

  const bank = await deploy("Bank", {
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
  if (bank.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setBank",
      bank.address,
    );
  }
};
deploy.dependencies = ["Core"];
deploy.tags = ["Bank"];

export default deploy;
