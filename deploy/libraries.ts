import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const address = await deploy("Address", { from: deployer! });

  await deploy("AmountNormalization", { from: deployer! });

  await deploy("EnumerableAddressSet", {
    from: deployer!,
  });

  const fixedPointMath = await deploy("FixedPointMath", {
    from: deployer!,
  });

  await deploy("SafeERC20", {
    from: deployer!,
    libraries: { Address: address.address },
  });

  await deploy("CollateralToken", {
    from: deployer!,
    libraries: { FixedPointMath: fixedPointMath.address },
  });

  await deploy("Loan", {
    from: deployer!,
    libraries: {
      FixedPointMath: fixedPointMath.address,
    },
  });

  await deploy("Math", {
    from: deployer!,
  });
};
deploy.tags = [
  "Address",
  "AmountNormalization",
  "CollateralToken",
  "EnumerableAddressSet",
  "FixedPointMath",
  "Libraries",
  "Loan",
  "Math",
  "SafeERC20",
];

export default deploy;
