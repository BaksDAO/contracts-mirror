import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({
  deployments,
  ethers,
  network,
}) {
  const { deploy, execute } = deployments;
  const { deployer, operator, liquidator, wrappedNativeToken } =
    await ethers.getNamedSigners();

  const $ = await deployments.get("Baks");

  const core = await deployments.get("Core");
  const priceOracle = network.tags.staging
    ? await deployments.get("DummyPriceOracle")
    : await deployments.get("ChainlinkPriceOracle");
  const exchangeFund = await deployments.get("ExchangeFund");
  const developmentFund = await deployments.get("DevelopmentFund");

  const baksDao = await deploy("Bank", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            wrappedNativeToken!.address,
            core.address,
            $.address,
            priceOracle.address,
            operator!.address,
            liquidator!.address,
            exchangeFund.address,
            developmentFund.address,
          ],
        },
      },
    },
    log: true,
  });
  if (baksDao.newlyDeployed) {
    await execute(
      "Baks",
      { from: deployer!.address, log: true },
      "setMinter",
      baksDao.address,
    );
  }
};
deploy.dependencies = [
  "Core",
  "$",
  "ExchangeFund",
  "DevelopmentFund",
  "PriceOracle",
];
deploy.tags = ["BaksDAO"];

export default deploy;
