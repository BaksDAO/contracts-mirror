import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";
import { Bank } from "./../src";

task("unlist-collateral-token", "Unlists the collateral token")
  .addParam(
    "tokenAddress",
    "The address of the token to unlist",
    undefined,
    types.string,
  )
  .setAction(async ({ tokenAddress }, hre) => {
    const bank = (await hre.ethers.getContract("Bank")) as Bank;

    await bank.unlistCollateralToken(tokenAddress);
  });
