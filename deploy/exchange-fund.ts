import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({
  deployments,
  ethers,
  network,
}) {
  const { deploy } = deployments;
  const { deployer, uniswapV2Router, operator, wrappedNativeToken } =
    await ethers.getNamedSigners();

  const $ = await deployments.get("Baks");
  const priceOracle = network.tags.staging
    ? await deployments.get("DummyPriceOracle")
    : await deployments.get("ChainlinkPriceOracle");

  await deploy("ExchangeFund", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            wrappedNativeToken!.address,
            $.address,
            priceOracle.address,
            uniswapV2Router!.address,
            operator!.address,
          ],
        },
      },
    },
    log: true,
  });
};
deploy.dependencies = ["$", "PriceOracle"];
deploy.tags = ["ExchangeFund"];

export default deploy;
