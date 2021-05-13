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

  const amountNormalization = await deployments.get("AmountNormalization");
  const enumerableAddressSet = await deployments.get("EnumerableAddressSet");
  const fixedPointMath = await deployments.get("FixedPointMath");
  const loan = await deployments.get("Loan");
  const safeERC20 = await deployments.get("SafeERC20");
  const collateralToken = await deployments.get("CollateralToken");
  const math = await deployments.get("Math");

  const priceOracle = network.tags.staging
    ? await deployments.get("DummyPriceOracle")
    : await deployments.get("ChainlinkPriceOracle");
  // const priceOracle = await deployments.get("ChainlinkPriceOracle");
  const exchangeFund = await deployments.get("ExchangeFund");
  const investmentFund = await deployments.get("InvestmentFund");

  const baksDao = await deploy("BaksDAO", {
    from: deployer!.address,
    args: [
      wrappedNativeToken!.address,
      $.address,
      priceOracle.address,
      operator!.address,
      liquidator!.address,
      exchangeFund.address,
      investmentFund.address,
    ],
    libraries: {
      AmountNormalization: amountNormalization.address,
      EnumerableAddressSet: enumerableAddressSet.address,
      FixedPointMath: fixedPointMath.address,
      Loan: loan.address,
      Math: math.address,
      SafeERC20: safeERC20.address,
      CollateralToken: collateralToken.address,
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
  "$",
  "AmountNormalization",
  "EnumerableAddressSet",
  "ExchangeFund",
  "FixedPointMath",
  "InvestmentFund",
  "Loan",
  "CollateralToken",
  "PriceOracle",
];
deploy.tags = ["BaksDAO"];

export default deploy;
