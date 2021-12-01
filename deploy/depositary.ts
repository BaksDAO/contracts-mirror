import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const core = await deployments.get("Core");

  const depositary = await deploy("Depositary", {
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

  if (depositary.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setDepositary",
      depositary.address,
    );
  }
};
deploy.dependencies = ["Core"];
deploy.tags = ["Depositary"];

export default deploy;
