import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  await deploy("InvestmentFund", {
    from: deployer!.address,
    log: true,
  });
};
deploy.tags = ["InvestmentFund"];

export default deploy;
