import { expect } from "chai";
import { Environment, setupEnvironment } from "./shared/environment";
import { percent } from "./shared/helpers";

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
  });
});
