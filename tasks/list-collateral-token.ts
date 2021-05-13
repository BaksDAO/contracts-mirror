import { parseFixed } from "@ethersproject/bignumber";
import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";
import { BaksDAO, ChainlinkPriceOracle, ExchangeFund } from "./../typechain";

task("list-collateral-token", "Lists the collateral token")
  .addParam(
    "tokenAddress",
    "The address of the token to list",
    undefined,
    types.string,
  )
  .addOptionalParam(
    "aggregatorAddress",
    "The address of the Chainlink aggregator for token",
    undefined,
    types.string,
  )
  .addParam("isQuoteNative", "", false, types.boolean)
  .addParam(
    "initialLoanToValueRatio",
    "Initial loan-to-value ratio for token",
    0.65,
    types.float,
  )
  .addParam(
    "createLiquidityPool",
    "Create token/BAKS liquidity pool on UniswapV2/Uniswap and list token as depositable to exchange fund",
    true,
    types.boolean,
  )
  .setAction(
    async (
      {
        tokenAddress,
        aggregatorAddress,
        isQuoteNative,
        initialLoanToValueRatio,
        createLiquidityPool,
      }: {
        tokenAddress: string;
        aggregatorAddress: string;
        isQuoteNative: boolean;
        initialLoanToValueRatio: number;
        createLiquidityPool: boolean;
      },
      hre,
    ) => {
      const baksDao = (await hre.ethers.getContract("BaksDAO")) as BaksDAO;

      const ltv = parseFixed(initialLoanToValueRatio.toString(), 18);

      if (aggregatorAddress) {
        const priceOracle = (await hre.ethers.getContract(
          "ChainlinkPriceOracle",
        )) as ChainlinkPriceOracle;
        await priceOracle.setAggregator(
          tokenAddress,
          aggregatorAddress,
          isQuoteNative,
        );
      }
      await baksDao.listCollateralToken(tokenAddress, ltv);

      if (createLiquidityPool) {
        const exchangeFund = (await hre.ethers.getContract(
          "ExchangeFund",
        )) as ExchangeFund;

        await exchangeFund.listDepositableToken(tokenAddress);
      }
    },
  );
