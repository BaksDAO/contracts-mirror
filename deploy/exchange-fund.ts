import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const core = await deployments.get("Core");

  const exchangeFund = await deploy("ExchangeFund", {
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

  if (exchangeFund.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setExchangeFund",
      exchangeFund.address,
    );
  }
};
deploy.dependencies = ["Core", "Depositary", "Voice"];
deploy.tags = ["ExchangeFund"];

export default deploy;
