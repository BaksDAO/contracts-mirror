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
  // const priceOracle = await deployments.get("ChainlinkPriceOracle");
  const amountNormalization = await deployments.get("AmountNormalization");
  const enumerableAddressSet = await deployments.get("EnumerableAddressSet");
  const fixedPointMath = await deployments.get("FixedPointMath");
  const safeERC20 = await deployments.get("SafeERC20");

  await deploy("ExchangeFund", {
    from: deployer!.address,
    args: [
      wrappedNativeToken!.address,
      $.address,
      priceOracle.address,
      uniswapV2Router!.address,
      operator!.address,
    ],
    libraries: {
      AmountNormalization: amountNormalization.address,
      EnumerableAddressSet: enumerableAddressSet.address,
      FixedPointMath: fixedPointMath.address,
      SafeERC20: safeERC20.address,
    },
    log: true,
  });
};
deploy.dependencies = [
  "$",
  "AmountNormalization",
  "EnumerableAddressSet",
  "FixedPointMath",
  "PriceOracle",
  "SafeERC20",
];
deploy.tags = ["ExchangeFund"];

export default deploy;
