import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, network }) {
  const { deploy } = deployments;
  const { deployer, wrappedNativeToken } = await ethers.getNamedSigners();

  if (network.tags.staging) {
    await deploy("DummyPriceOracle", {
      from: deployer!.address,
      proxy: {
        execute: {
          init: {
            methodName: "initialize",
            args: [wrappedNativeToken!.address],
          },
        },
      },
      log: true,
    });
  } else {
    await deploy("ChainlinkPriceOracle", {
      from: deployer!.address,
      proxy: {
        execute: {
          init: {
            methodName: "initialize",
            args: [wrappedNativeToken!.address],
          },
        },
      },
      log: true,
    });
  }
};
deploy.tags = ["PriceOracle"];

export default deploy;
