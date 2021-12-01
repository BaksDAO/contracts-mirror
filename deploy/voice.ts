import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy, execute } = deployments;
  const { deployer } = await ethers.getNamedSigners();

  const bank = await deployments.get("Bank");

  const voice = await deploy("Voice", {
    from: deployer!.address,
    args: [bank.address],
    log: true,
  });

  if (voice.newlyDeployed) {
    await execute(
      "Core",
      { from: deployer!.address, log: true },
      "setVoice",
      voice.address,
    );
  }

  await execute(
    "Voice",
    { from: deployer!.address, log: true },
    "setMinter",
    bank.address,
  );
};
deploy.tags = ["Voice"];
deploy.dependencies = ["Bank", "Core"];

export default deploy;
