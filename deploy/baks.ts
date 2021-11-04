import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy } = deployments;
  const { deployer, minter } = await ethers.getNamedSigners();

  await deploy("Baks", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: ["Baks", "BAKS", 18, minter!.address],
        },
      },
    },
    log: true,
  });
};
deploy.tags = ["$"];

export default deploy;
