import { Depositary } from "!types/Depositary";
import { parseFixed } from "@ethersproject/bignumber";
import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";

task("add-deposit-pool", "Add the deposit pool")
  .addParam(
    "tokenAddress",
    "The address of the token to add",
    undefined,
    types.string,
  )
  .addParam("isCompounding", "", false, types.boolean)
  .addParam("depositorApr", "", undefined, types.float)
  .addParam("magisterApr", "", undefined, types.float)
  .addParam("depositorBonusApr", "", 0.05, types.float)
  .addParam("magisterBonusApr", "", 0.05, types.float)
  .setAction(
    async (
      {
        tokenAddress,
        isCompounding,
        depositorApr,
        magisterApr,
        depositorBonusApr,
        magisterBonusApr,
      }: {
        tokenAddress: string;
        isCompounding: boolean;
        depositorApr: number;
        magisterApr: number;
        depositorBonusApr: number;
        magisterBonusApr: number;
      },
      hre,
    ) => {
      const depositary = (await hre.ethers.getContract(
        "Depositary",
      )) as Depositary;

      await depositary.addPool(
        tokenAddress,
        isCompounding,
        parseFixed(depositorApr.toString(), 18),
        parseFixed(magisterApr.toString(), 18),
        parseFixed(depositorBonusApr.toString(), 18),
        parseFixed(magisterBonusApr.toString(), 18),
      );
    },
  );
