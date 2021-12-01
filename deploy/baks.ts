import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const bank = await deployments.get("Bank");

  const baks = await deploy("Baks", {
    from: deployer!.address,
    args: [bank.address],
    log: true,
  });

  if (baks.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setBaks",
      baks.address,
    );
  }

  await execute(
    "Baks",
    { from: deployer!.address, log: true },
    "setMinter",
    bank.address,
  );
};
deploy.tags = ["Baks"];
deploy.dependencies = ["Bank", "Core"];

export default deploy;
