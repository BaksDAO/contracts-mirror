import { expect } from "chai";
import { Environment, setupEnvironment } from "./shared/environment";
import { BaksDAOErrors } from "./shared/errors";
import { percent } from "./shared/helpers";

describe("Core", () => {
  let env: Environment;

  beforeEach(async () => {
    env = await setupEnvironment();
  });

  it("updates stability fee", async () => {
    const stabilityFee = await env.core.stabilityFee();
    const newStabilityFee = percent(5);

    await expect(env.core.setStabilityFee(newStabilityFee))
      .to.emit(env.core, "StabilityFeeUpdated")
      .withArgs(stabilityFee, newStabilityFee);

    expect(await env.core.stabilityFee()).to.be.equal(newStabilityFee);
  });

  describe("platform fees", () => {
    it("reverts when platform fees sum up to less than one", async () => {
      const newStabilizationFee = percent(33);
      const newExchangeFee = percent(33);
      const newDevelopmentFee = percent(32);

      await expect(
        env.core.setPlatformFees(
          newStabilizationFee,
          newExchangeFee,
          newDevelopmentFee,
        ),
      ).to.be.revertedWith(BaksDAOErrors.PlatformFeesDontSumUpToOne);
    });

    it("reverts when platform fees sum up to more than one", async () => {
      const newStabilizationFee = percent(33);
      const newExchangeFee = percent(33);
      const newDevelopmentFee = percent(35);

      await expect(
        env.core.setPlatformFees(
          newStabilizationFee,
          newExchangeFee,
          newDevelopmentFee,
        ),
      ).to.be.revertedWith(BaksDAOErrors.PlatformFeesDontSumUpToOne);
    });

    it("updates platform fees", async () => {
      const stabilizationFee = await env.core.stabilizationFee();
      const exchangeFee = await env.core.exchangeFee();
      const developmentFee = await env.core.developmentFee();

      const newStabilizationFee = percent(25);
      const newExchangeFee = percent(50);
      const newDevelopmentFee = percent(25);

      await expect(
        env.core.setPlatformFees(
          newStabilizationFee,
          newExchangeFee,
          newDevelopmentFee,
        ),
      )
        .to.emit(env.core, "PlatformFeesUpdated")
        .withArgs(
          stabilizationFee,
          newStabilizationFee,
          exchangeFee,
          newExchangeFee,
          developmentFee,
          newDevelopmentFee,
        );

      expect(await env.core.stabilizationFee()).to.be.equal(
        newStabilizationFee,
      );
      expect(await env.core.exchangeFee()).to.be.equal(newExchangeFee);
      expect(await env.core.developmentFee()).to.be.equal(newDevelopmentFee);
    });
  });

  it("updates margin call loan-to-value ratio", async () => {
    const marginCallLoanToValueRatio =
      await env.core.marginCallLoanToValueRatio();
    const newMarginCallLoanToValueRatio = percent(85);

    await expect(
      env.core.setMarginCallLoanToValueRatio(newMarginCallLoanToValueRatio),
    )
      .to.emit(env.core, "MarginCallLoanToValueRatioUpdated")
      .withArgs(marginCallLoanToValueRatio, newMarginCallLoanToValueRatio);

    expect(await env.core.marginCallLoanToValueRatio()).to.be.equal(
      newMarginCallLoanToValueRatio,
    );
  });

  it("updates liquidation loan-to-value ratio", async () => {
    const liquidationLoanToValueRatio =
      await env.core.liquidationLoanToValueRatio();
    const newLiquidationLoanToValueRatio = percent(95);

    await expect(
      env.core.setLiquidationLoanToValueRatio(newLiquidationLoanToValueRatio),
    )
      .to.emit(env.core, "LiquidationLoanToValueRatioUpdated")
      .withArgs(liquidationLoanToValueRatio, newLiquidationLoanToValueRatio);

    expect(await env.core.liquidationLoanToValueRatio()).to.be.equal(
      newLiquidationLoanToValueRatio,
    );
  });

  it("updates rebalancing threshold", async () => {
    const rebalancingThreshold = await env.core.rebalancingThreshold();
    const newRebalancingThreshold = percent(3);

    await expect(env.core.setRebalancingThreshold(newRebalancingThreshold))
      .to.emit(env.core, "RebalancingThresholdUpdated")
      .withArgs(rebalancingThreshold, newRebalancingThreshold);

    expect(await env.core.rebalancingThreshold()).to.be.equal(
      newRebalancingThreshold,
    );
  });
});
