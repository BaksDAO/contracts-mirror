import { smock } from "@defi-wonderland/smock";
import { BigNumber } from "@ethersproject/bignumber";
import chai, { expect } from "chai";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { IERC20 } from "typechain";
import { COL } from "./shared/constants";
import { Environment, setupEnvironment } from "./shared/environment";
import { percent } from "./shared/helpers";

chai.use(smock.matchers);

function _sqrt(value: BigNumber) {
  const ONE = ethers.BigNumber.from(1);
  const TWO = ethers.BigNumber.from(2);
  const x: BigNumber = ethers.BigNumber.from(value);
  let z = x.add(ONE).div(TWO);
  let y = x;
  while (z.sub(y).isNegative()) {
    y = z;
    z = x.div(z).add(z).div(TWO);
  }
  return y;
}

function _fpsqrt(value: BigNumber) {
  let y = _sqrt(value).mul(1e9);
  return y;
}
describe("Exchange Fund", () => {
  let env: Environment;

  beforeEach(async () => {
    env = await setupEnvironment();
  });

  it("correctly constructed", async () => {
    expect(await env.exchangeFund.wrappedNativeCurrency()).to.equal(
      env.wrappedNativeCurrency.address,
    );
    expect(await env.exchangeFund.stablecoin()).to.equal(env.$.address);
    expect(await env.exchangeFund.priceOracle()).to.equal(
      env.priceOracle.address,
    );
    expect(await env.exchangeFund.uniswapV2Router()).to.equal(
      env.uniswapV2Router.address,
    );
    expect(await env.exchangeFund.operator()).to.equal(env.operator.address);
  });

  describe("governed functions", () => {
    it("lists and unlists depositable token", async () => {
      await expect(
        env.governedExchangeFund.unlistDepositableToken(
          env.collateralToken.address,
        ),
      )
        .to.emit(env.exchangeFund, "DepositableTokenUnlisted")
        .withArgs(env.collateralToken.address);

      expect(await env.exchangeFund.getDepositableTokens()).to.be.empty;

      await expect(
        env.governedExchangeFund.listDepositableToken(
          env.collateralToken.address,
        ),
      )
        .to.emit(env.exchangeFund, "DepositableTokenListed")
        .withArgs(env.collateralToken.address, env.uniswapV2Pair.address);

      expect(await env.exchangeFund.getDepositableTokens()).to.have.lengthOf(1);
    });

    it("updates slippage tolerance", async () => {
      const slippageTolerance = await env.exchangeFund.slippageTolerance();
      const newSlippageTolerance = percent(1);

      await expect(
        env.governedExchangeFund.setSlippageTolerance(newSlippageTolerance),
      )
        .to.emit(env.exchangeFund, "SlippageToleranceUpdated")
        .withArgs(slippageTolerance, newSlippageTolerance);

      expect(await env.exchangeFund.slippageTolerance()).to.be.equal(
        newSlippageTolerance,
      );
    });

    it("updates swap deadline", async () => {
      const swapDeadline = await env.exchangeFund.swapDeadline();
      const newSwapDeadline = swapDeadline.div(2);

      await expect(env.governedExchangeFund.setSwapDeadline(newSwapDeadline))
        .to.emit(env.exchangeFund, "SwapDeadlineUpdated")
        .withArgs(swapDeadline, newSwapDeadline);

      expect(await env.exchangeFund.swapDeadline()).to.be.equal(
        newSwapDeadline,
      );
    });

    it("service (stableCoin=>token) and need addLiquidity", async () => {
      env.uniswapV2Pair.getReserves.reset();
      env.uniswapV2Router.addLiquidity.reset();
      let amountStableCoin: BigNumber = parseEther("40000");
      let amountToken: BigNumber = parseUnits("10", COL.DECIMALS);
      let priceToken: BigNumber = parseEther("4100");
      const blockTimestampLast = Math.floor(Date.now() / 1000);
      const nextBlockTimeStamp = blockTimestampLast + 1000;
      const addressStableCoin = env.$.address;
      const addressToken = env.collateralToken.address;
      const deadLine = await env.exchangeFund.swapDeadline();

      await env.setCollateralPrice(priceToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(0, [
          amountStableCoin,
          amountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(0, [
          amountToken,
          amountStableCoin,
          blockTimestampLast,
        ]);
      }
      const dealSize: BigNumber = _fpsqrt(
        amountStableCoin.mul(amountToken.mul(1e10)).div(priceToken),
      )
        .sub(amountToken.mul(1e10))
        .abs();

      const newAmountToken = amountToken.sub(dealSize.div(1e10));
      const newAmountStableCoin = amountToken
        .mul(1e10)
        .mul(priceToken)
        .div(ethers.constants.WeiPerEther);
      priceToken = newAmountStableCoin
        .mul(ethers.constants.WeiPerEther)
        .div(newAmountToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountStableCoin,
          newAmountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountToken,
          newAmountStableCoin,
          blockTimestampLast,
        ]);
      }

      await ethers.provider.send("evm_setNextBlockTimestamp", [
        nextBlockTimeStamp,
      ]);

      await env.exchangeFund.connect(env.governor).service(addressToken);
      expect(
        env.uniswapV2Router.swapTokensForExactTokens,
      ).to.have.been.calledWith(
        dealSize,
        ethers.constants.MaxUint256,
        [addressStableCoin, addressToken],
        env.exchangeFund.address,
        BigNumber.from(nextBlockTimeStamp).add(deadLine),
      );
      if (newAmountStableCoin.gte(await env.core.minimumLiquidity())) {
        expect(env.uniswapV2Router.addLiquidity).to.have.not.been.called;
      } else {
        const minimumLiquidity = await env.core.minimumLiquidity();
        const ONE: BigNumber = ethers.constants.WeiPerEther;
        const slippageTolerance = await env.exchangeFund.slippageTolerance();
        const deltaStableCoin = minimumLiquidity.sub(newAmountStableCoin);
        const deltaToken = deltaStableCoin
          .mul(ethers.constants.WeiPerEther)
          .div(priceToken);

        expect(env.uniswapV2Pair.getReserves).to.have.been.callCount(2);
        expect(env.uniswapV2Router.addLiquidity).to.have.been.calledWith(
          env.$.address,
          env.collateralToken.address,
          deltaStableCoin,
          deltaToken,
          deltaStableCoin.mul(ONE.sub(slippageTolerance)).div(ONE),
          deltaToken
            .mul(ONE.sub(slippageTolerance))
            .div(ONE)
            .div(BigNumber.from(1e10)),
          env.exchangeFund.address,
          BigNumber.from(nextBlockTimeStamp).add(deadLine),
        );
      }
    });

    it("service (stableCoin=>token) and not need addLiquidity", async () => {
      env.uniswapV2Pair.getReserves.reset();
      env.uniswapV2Router.addLiquidity.reset();
      let amountStableCoin: BigNumber = parseEther("50000");
      let amountToken: BigNumber = parseUnits("10", COL.DECIMALS);
      let priceToken: BigNumber = parseEther("5100");
      const blockTimestampLast = Math.floor(Date.now() / 1000);
      const nextBlockTimeStamp = blockTimestampLast + 1000;
      const addressStableCoin = env.$.address;
      const addressToken = env.collateralToken.address;
      const deadLine = await env.exchangeFund.swapDeadline();

      await env.setCollateralPrice(priceToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(0, [
          amountStableCoin,
          amountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(0, [
          amountToken,
          amountStableCoin,
          blockTimestampLast,
        ]);
      }
      const dealSize: BigNumber = _fpsqrt(
        amountStableCoin.mul(amountToken.mul(1e10)).div(priceToken),
      )
        .sub(amountToken.mul(1e10))
        .abs();

      const newAmountToken = amountToken.sub(dealSize.div(1e10));
      const newAmountStableCoin = amountToken
        .mul(1e10)
        .mul(priceToken)
        .div(ethers.constants.WeiPerEther);
      priceToken = newAmountStableCoin
        .mul(ethers.constants.WeiPerEther)
        .div(newAmountToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountStableCoin,
          newAmountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountToken,
          newAmountStableCoin,
          blockTimestampLast,
        ]);
      }

      await ethers.provider.send("evm_setNextBlockTimestamp", [
        nextBlockTimeStamp,
      ]);

      await env.exchangeFund.connect(env.governor).service(addressToken);
      expect(
        env.uniswapV2Router.swapTokensForExactTokens,
      ).to.have.been.calledWith(
        dealSize,
        ethers.constants.MaxUint256,
        [addressStableCoin, addressToken],
        env.exchangeFund.address,
        BigNumber.from(nextBlockTimeStamp).add(deadLine),
      );
      if (newAmountStableCoin.gte(await env.core.minimumLiquidity())) {
        expect(env.uniswapV2Router.addLiquidity).to.have.not.been.called;
      } else {
        const minimumLiquidity = await env.core.minimumLiquidity();
        const ONE: BigNumber = ethers.constants.WeiPerEther;
        const slippageTolerance = await env.exchangeFund.slippageTolerance();
        const deltaStableCoin = minimumLiquidity.sub(newAmountStableCoin);
        const deltaToken = deltaStableCoin
          .mul(ethers.constants.WeiPerEther)
          .div(priceToken);

        expect(env.uniswapV2Pair.getReserves).to.have.been.callCount(2);
        expect(env.uniswapV2Router.addLiquidity).to.have.been.calledWith(
          env.$.address,
          env.collateralToken.address,
          deltaStableCoin,
          deltaToken,
          deltaStableCoin.mul(ONE.sub(slippageTolerance)).div(ONE),
          deltaToken
            .mul(ONE.sub(slippageTolerance))
            .div(ONE)
            .div(BigNumber.from(1e10)),
          env.exchangeFund.address,
          BigNumber.from(nextBlockTimeStamp).add(deadLine),
        );
      }
    });

    it("service (token=>stableCoin) and need addLiquidity", async () => {
      env.uniswapV2Pair.getReserves.reset();
      env.uniswapV2Router.addLiquidity.reset();
      //let addr: BigNumber = BigNumber.from(env.collateralToken.address);
      const zeroToken = await smock.fake<IERC20>("IERC20", {
        address: ethers.constants.AddressZero,
      });
      zeroToken.decimals.returns(8);
      let amountStableCoin: BigNumber = parseEther("50000");
      let amountToken: BigNumber = parseUnits("10", COL.DECIMALS);
      let priceToken: BigNumber = parseEther("4900");
      const blockTimestampLast = Math.floor(Date.now() / 1000);
      const nextBlockTimeStamp = blockTimestampLast + 1000;
      const addressStableCoin = env.$.address;
      const addressToken = zeroToken.address; //
      const deadLine = await env.exchangeFund.swapDeadline();

      await env.setCollateralPrice(priceToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returns([
          amountStableCoin,
          amountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returns([
          amountToken,
          amountStableCoin,
          blockTimestampLast,
        ]);
      }

      const dealSize: BigNumber = _fpsqrt(
        amountStableCoin
          .mul(amountToken.mul(1e10))
          .mul(priceToken)
          .div(ethers.constants.WeiPerEther)
          .div(ethers.constants.WeiPerEther),
      )
        .sub(amountStableCoin)
        .abs();
      const newAmountStableCoin = amountStableCoin.sub(dealSize);
      const newAmountToken = newAmountStableCoin
        .mul(BigNumber.from(1e8))
        .div(priceToken);
      priceToken = newAmountStableCoin
        .mul(ethers.constants.WeiPerEther)
        .div(newAmountToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountStableCoin,
          newAmountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountToken,
          newAmountStableCoin,
          blockTimestampLast,
        ]);
      }

      await ethers.provider.send("evm_setNextBlockTimestamp", [
        nextBlockTimeStamp,
      ]);
      await env.exchangeFund.connect(env.governor).service(addressToken);
      expect(
        env.uniswapV2Router.swapTokensForExactTokens,
      ).to.have.been.calledWith(
        dealSize,
        ethers.constants.MaxUint256,
        [addressToken, addressStableCoin],
        env.exchangeFund.address,
        BigNumber.from(nextBlockTimeStamp).add(deadLine),
      );
      if (newAmountStableCoin.gte(await env.core.minimumLiquidity())) {
        expect(env.uniswapV2Router.addLiquidity).to.have.not.been.called;
      } else {
        const minimumLiquidity = await env.core.minimumLiquidity();
        const ONE: BigNumber = ethers.constants.WeiPerEther;
        const slippageTolerance = await env.exchangeFund.slippageTolerance();
        const deltaStableCoin = minimumLiquidity.sub(newAmountStableCoin);
        const deltaToken = deltaStableCoin
          .mul(ethers.constants.WeiPerEther)
          .div(priceToken);

        expect(env.uniswapV2Pair.getReserves).to.have.been.callCount(2);
        expect(env.uniswapV2Router.addLiquidity).to.have.been.calledWith(
          env.$.address,
          zeroToken.address,
          deltaStableCoin,
          deltaToken,
          deltaStableCoin.mul(ONE.sub(slippageTolerance)).div(ONE),
          deltaToken
            .mul(ONE.sub(slippageTolerance))
            .div(ONE)
            .div(BigNumber.from(1e10)),
          env.exchangeFund.address,
          BigNumber.from(nextBlockTimeStamp).add(deadLine),
        );
      }
    });

    it("service (token=>stableCoin) and not need addLiquidity", async () => {
      env.uniswapV2Pair.getReserves.reset();
      env.uniswapV2Router.addLiquidity.reset();
      //let addr: BigNumber = BigNumber.from(env.collateralToken.address);
      const zeroToken = await smock.fake<IERC20>("IERC20", {
        address: ethers.constants.AddressZero,
      });
      zeroToken.decimals.returns(8);
      let amountStableCoin: BigNumber = parseEther("60000");
      let amountToken: BigNumber = parseUnits("10", COL.DECIMALS);
      let priceToken: BigNumber = parseEther("5900");
      const blockTimestampLast = Math.floor(Date.now() / 1000);
      const nextBlockTimeStamp = blockTimestampLast + 1000;
      const addressStableCoin = env.$.address;
      const addressToken = zeroToken.address; //
      const deadLine = await env.exchangeFund.swapDeadline();

      await env.setCollateralPrice(priceToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returns([
          amountStableCoin,
          amountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returns([
          amountToken,
          amountStableCoin,
          blockTimestampLast,
        ]);
      }

      const dealSize: BigNumber = _fpsqrt(
        amountStableCoin
          .mul(amountToken.mul(1e10))
          .mul(priceToken)
          .div(ethers.constants.WeiPerEther)
          .div(ethers.constants.WeiPerEther),
      )
        .sub(amountStableCoin)
        .abs();
      const newAmountStableCoin = amountStableCoin.sub(dealSize);
      const newAmountToken = newAmountStableCoin
        .mul(BigNumber.from(1e8))
        .div(priceToken);
      priceToken = newAmountStableCoin
        .mul(ethers.constants.WeiPerEther)
        .div(newAmountToken);

      if (BigNumber.from(addressStableCoin).lt(addressToken)) {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountStableCoin,
          newAmountToken,
          blockTimestampLast,
        ]);
      } else {
        env.uniswapV2Pair.getReserves.returnsAtCall(1, [
          newAmountToken,
          newAmountStableCoin,
          blockTimestampLast,
        ]);
      }

      await ethers.provider.send("evm_setNextBlockTimestamp", [
        nextBlockTimeStamp,
      ]);
      await env.exchangeFund.connect(env.governor).service(addressToken);
      expect(
        env.uniswapV2Router.swapTokensForExactTokens,
      ).to.have.been.calledWith(
        dealSize,
        ethers.constants.MaxUint256,
        [addressToken, addressStableCoin],
        env.exchangeFund.address,
        BigNumber.from(nextBlockTimeStamp).add(deadLine),
      );
      if (newAmountStableCoin.gte(await env.core.minimumLiquidity())) {
        expect(env.uniswapV2Router.addLiquidity).to.have.not.been.called;
      } else {
        const minimumLiquidity = await env.core.minimumLiquidity();
        const ONE: BigNumber = ethers.constants.WeiPerEther;
        const slippageTolerance = await env.exchangeFund.slippageTolerance();
        const deltaStableCoin = minimumLiquidity.sub(newAmountStableCoin);
        const deltaToken = deltaStableCoin
          .mul(ethers.constants.WeiPerEther)
          .div(priceToken);

        expect(env.uniswapV2Pair.getReserves).to.have.been.callCount(2);
        expect(env.uniswapV2Router.addLiquidity).to.have.been.calledWith(
          env.$.address,
          zeroToken.address,
          deltaStableCoin,
          deltaToken,
          deltaStableCoin.mul(ONE.sub(slippageTolerance)).div(ONE),
          deltaToken
            .mul(ONE.sub(slippageTolerance))
            .div(ONE)
            .div(BigNumber.from(1e10)),
          env.exchangeFund.address,
          BigNumber.from(nextBlockTimeStamp).add(deadLine),
        );
      }
    });
  });
});
