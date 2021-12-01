import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ deployments, ethers }) {
  const { deploy } = deployments;
  const {
    deployer,
    uniswapV2Router,
    wrappedNativeToken,
    operator,
    liquidator,
  } = await ethers.getNamedSigners();

  await deploy("Core", {
    from: deployer!.address,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            wrappedNativeToken.address,
            uniswapV2Router.address,
            operator.address,
            liquidator.address,
          ],
        },
      },
    },
    log: true,
  });
};
deploy.tags = ["Core"];

export default deploy;
