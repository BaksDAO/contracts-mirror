import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  await deploy("DevelopmentFund", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [],
        },
      },
    },
    log: true,
  });
};
deploy.tags = ["DevelopmentFund"];

export default deploy;
