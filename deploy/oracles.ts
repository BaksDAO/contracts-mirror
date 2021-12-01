import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, network }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const core = await deployments.get("Core");

  let priceOracle;
  if (network.tags.staging) {
    priceOracle = await deploy("DummyPriceOracle", {
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
  } else {
    priceOracle = await deploy("ChainlinkPriceOracle", {
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
  }

  if (priceOracle.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setPriceOracle",
      priceOracle.address,
    );
  }
};
deploy.tags = ["PriceOracle"];
deploy.dependencies = ["Core"];

export default deploy;
