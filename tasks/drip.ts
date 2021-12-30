import { BaseToken } from "!types/BaseToken";
import "@nomiclabs/hardhat-ethers";
import { task, types } from "hardhat/config";

enum Token {
  WBNB = "0x2Cf210ad0a8f31D8A7b5742931B9C3ECb663cdB8",
  BTCB = "0xc6e75F62a777D9F8AEF75461ff3392a6263371B2",
  ETH = "0x4Fea99981aE63C23e96f6164A9926C85247c003B",
  USDT = "0x53807EEF6651a49032406B64a42C5a9b334CAbf3",
}

task("drip", "Drips some test tokens to the account")
  .addPositionalParam("symbol", "", undefined, types.string)
  .addPositionalParam("account", "", undefined, types.string)
  .addPositionalParam("amount", "", undefined, types.float)
  .setAction(
    async (
      {
        symbol,
        account,
        amount,
      }: {
        symbol: string;
        account: string;
        amount: number;
      },
      hre,
    ) => {
      const token = (await hre.ethers.getContractAt(
        "BaseToken",
        Token[symbol as keyof typeof Token],
      )) as BaseToken;
      const decimals = await token.decimals();

      await token.mint(
        account,
        hre.ethers.utils.parseUnits(amount.toString(), decimals),
      );
    },
  );
