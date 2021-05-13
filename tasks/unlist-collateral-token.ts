import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";
import { BaksDAO } from "./../typechain";

task("unlist-collateral-token", "Unlists the collateral token")
  .addParam(
    "tokenAddress",
    "The address of the token to unlist",
    undefined,
    types.string,
  )
  .setAction(async ({ tokenAddress }, hre) => {
    const baksDao = (await hre.ethers.getContract("BaksDAO")) as BaksDAO;

    await baksDao.unlistCollateralToken(tokenAddress);
  });
