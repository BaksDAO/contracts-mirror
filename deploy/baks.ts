import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy } = deployments;
  const { deployer, minter } = await ethers.getNamedSigners();

  await deploy("Baks", {
    from: deployer!.address,
    args: [minter!.address],
    log: true,
  });
};
deploy.tags = ["$"];

export default deploy;
