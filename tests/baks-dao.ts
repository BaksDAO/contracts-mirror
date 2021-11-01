import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  COL,
  DECIMALS,
  DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
  INITIAL_COL_PRICE,
  LOAN_ID,
  LOAN_PRINICPAL_AMOUNT,
} from "./shared/constants";
import { Environment, setupEnvironment } from "./shared/environment";
import { BaksDAOErrors } from "./shared/errors";
import {
  col,
  e10,
  generateRandomAddress,
  percent,
  usd,
} from "./shared/helpers";
import { LoanHealth } from "./shared/types";

describe("BaksDAO", () => {
  let env: Environment;

  beforeEach(async () => {
    env = await setupEnvironment();
  });

  it("correctly constructed", async () => {
    expect(await env.baksDao.stablecoin()).to.equal(env.$.address);
    expect(await env.baksDao.priceOracle()).to.equal(env.priceOracle.address);
    expect(await env.baksDao.operator()).to.equal(env.operator.address);
    expect(await env.baksDao.liquidator()).to.equal(env.liquidator.address);
    expect(await env.baksDao.exchangeFund()).to.equal(env.exchangeFund.address);
    expect(await env.baksDao.developmentFund()).to.equal(
      env.developmentFund.address,
    );
  });

  it("reverts when receives plain native currency transfer", async () => {
    await expect(
      env.user.sendTransaction({
        to: env.baksDao.address,
        value: ethers.utils.parseEther("0.01"),
      }),
    ).to.be.revertedWith(BaksDAOErrors.PlainNativeCurrencyTransferNotAllowed);
  });

  describe("governed functions", () => {
    it("lists and unlists token as collateral", async () => {
      await expect(
        env.governedBaksDAO.unlistCollateralToken(env.collateralToken.address),
      )
        .to.emit(env.baksDao, "CollateralTokenUnlisted")
        .withArgs(env.collateralToken.address);

      expect(await env.baksDao.getAllowedCollateralTokens()).to.be.empty;

      await expect(
        env.governedBaksDAO.listCollateralToken(
          env.collateralToken.address,
          DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
        ),
      )
        .to.emit(env.baksDao, "CollateralTokenListed")
        .withArgs(env.collateralToken.address)
        .to.emit(env.baksDao, "InitialLoanToValueRatioUpdated")
        .withArgs(
          env.collateralToken.address,
          0,
          DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
        );

      expect(await env.baksDao.getAllowedCollateralTokens()).to.have.lengthOf(
        1,
      );
    });

    it("updates stability fee", async () => {
      const stabilityFee = await env.baksDao.stabilityFee();
      const newStabilityFee = percent(5);

      await expect(env.governedBaksDAO.setStabilityFee(newStabilityFee))
        .to.emit(env.baksDao, "StabilityFeeUpdated")
        .withArgs(stabilityFee, newStabilityFee);

      expect(await env.baksDao.stabilityFee()).to.be.equal(newStabilityFee);
    });

    describe("platform fees", () => {
      it("reverts when platform fees sum up to less than one", async () => {
        const newStabilizationFee = percent(33);
        const newExchangeFee = percent(33);
        const newDevelopmentFee = percent(32);

        await expect(
          env.governedBaksDAO.setPlatformFees(
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
          env.governedBaksDAO.setPlatformFees(
            newStabilizationFee,
            newExchangeFee,
            newDevelopmentFee,
          ),
        ).to.be.revertedWith(BaksDAOErrors.PlatformFeesDontSumUpToOne);
      });

      it("updates platform fees", async () => {
        const stabilizationFee = await env.baksDao.stabilizationFee();
        const exchangeFee = await env.baksDao.exchangeFee();
        const developmentFee = await env.baksDao.developmentFee();

        const newStabilizationFee = percent(25);
        const newExchangeFee = percent(50);
        const newDevelopmentFee = percent(25);

        await expect(
          env.governedBaksDAO.setPlatformFees(
            newStabilizationFee,
            newExchangeFee,
            newDevelopmentFee,
          ),
        )
          .to.emit(env.baksDao, "PlatformFeesUpdated")
          .withArgs(
            stabilizationFee,
            newStabilizationFee,
            exchangeFee,
            newExchangeFee,
            developmentFee,
            newDevelopmentFee,
          );

        expect(await env.baksDao.stabilizationFee()).to.be.equal(
          newStabilizationFee,
        );
        expect(await env.baksDao.exchangeFee()).to.be.equal(newExchangeFee);
        expect(await env.baksDao.developmentFee()).to.be.equal(
          newDevelopmentFee,
        );
      });
    });

    it("updates margin call loan-to-value ratio", async () => {
      const marginCallLoanToValueRatio =
        await env.baksDao.marginCallLoanToValueRatio();
      const newMarginCallLoanToValueRatio = percent(85);

      await expect(
        env.governedBaksDAO.setMarginCallLoanToValueRatio(
          newMarginCallLoanToValueRatio,
        ),
      )
        .to.emit(env.baksDao, "MarginCallLoanToValueRatioUpdated")
        .withArgs(marginCallLoanToValueRatio, newMarginCallLoanToValueRatio);

      expect(await env.baksDao.marginCallLoanToValueRatio()).to.be.equal(
        newMarginCallLoanToValueRatio,
      );
    });

    it("updates liquidation loan-to-value ratio", async () => {
      const liquidationLoanToValueRatio =
        await env.baksDao.liquidationLoanToValueRatio();
      const newLiquidationLoanToValueRatio = percent(95);

      await expect(
        env.governedBaksDAO.setLiquidationLoanToValueRatio(
          newLiquidationLoanToValueRatio,
        ),
      )
        .to.emit(env.baksDao, "LiquidationLoanToValueRatioUpdated")
        .withArgs(liquidationLoanToValueRatio, newLiquidationLoanToValueRatio);

      expect(await env.baksDao.liquidationLoanToValueRatio()).to.be.equal(
        newLiquidationLoanToValueRatio,
      );
    });

    it("updates rebalancing threshold", async () => {
      const rebalancingThreshold = await env.baksDao.rebalancingThreshold();
      const newRebalancingThreshold = percent(3);

      await expect(
        env.governedBaksDAO.setRebalancingThreshold(newRebalancingThreshold),
      )
        .to.emit(env.baksDao, "RebalancingThresholdUpdated")
        .withArgs(rebalancingThreshold, newRebalancingThreshold);

      expect(await env.baksDao.rebalancingThreshold()).to.be.equal(
        newRebalancingThreshold,
      );
    });

    describe("initial loan-to-value ratio", () => {
      it("reverts when token is not allowed as collateral", async () => {
        const token = generateRandomAddress();
        const newInitialLoanToValueRatio = percent(75);

        await expect(
          env.governedBaksDAO.setInitialLoanToValueRatio(
            token,
            newInitialLoanToValueRatio,
          ),
        ).to.be.revertedWith(BaksDAOErrors.CollateralTokenNotListed);
      });

      it("reverts when new initial loan-to-value ratio equal or higher than margin call loan-to-value ratio", async () => {
        const { marginCallLoanToValueRatio } =
          await env.baksDao.collateralTokens(env.collateralToken.address);

        await expect(
          env.governedBaksDAO.setInitialLoanToValueRatio(
            env.collateralToken.address,
            marginCallLoanToValueRatio,
          ),
        ).to.be.revertedWith(BaksDAOErrors.InitialLoanToValueRatioTooHigh);

        await expect(
          env.governedBaksDAO.setInitialLoanToValueRatio(
            env.collateralToken.address,
            marginCallLoanToValueRatio.add(1),
          ),
        ).to.be.revertedWith(BaksDAOErrors.InitialLoanToValueRatioTooHigh);
      });

      it("updates initial loan-to-value ratio", async () => {
        const { marginCallLoanToValueRatio } =
          await env.baksDao.collateralTokens(env.collateralToken.address);
        let initialLoanToValueRatio = (
          await env.baksDao.collateralTokens(env.collateralToken.address)
        ).initialLoanToValueRatio;
        const newInitialLoanToValueRatio = marginCallLoanToValueRatio.sub(1);

        await expect(
          env.governedBaksDAO.setInitialLoanToValueRatio(
            env.collateralToken.address,
            newInitialLoanToValueRatio,
          ),
        )
          .to.emit(env.baksDao, "InitialLoanToValueRatioUpdated")
          .withArgs(
            env.collateralToken.address,
            initialLoanToValueRatio,
            newInitialLoanToValueRatio,
          );

        initialLoanToValueRatio = (
          await env.baksDao.collateralTokens(env.collateralToken.address)
        ).initialLoanToValueRatio;
        expect(initialLoanToValueRatio).to.be.equal(newInitialLoanToValueRatio);
      });
    });

    describe("salvation", () => {
      it("reverts when trying to salvage one of collateral tokens", async () => {
        await expect(
          env.governedBaksDAO.salvage(env.collateralToken.address),
        ).to.be.revertedWith(BaksDAOErrors.TokenNotAllowedToBeSalvaged);
      });

      it("reverts when trying to salvage stablecoin", async () => {
        await expect(
          env.governedBaksDAO.salvage(env.$.address),
        ).to.be.revertedWith(BaksDAOErrors.TokenNotAllowedToBeSalvaged);
      });
    });
  });

  describe("borrow", () => {
    it("reverts when token is not allowed as collateral", async () => {
      const token = generateRandomAddress();

      await expect(env.baksDao.borrow(token, usd(100))).to.be.revertedWith(
        BaksDAOErrors.TokenNotAllowedAsCollateral,
      );
    });

    it("reverts when `amount` is zero", async () => {
      await expect(env.borrow(0)).to.be.revertedWith(
        BaksDAOErrors.BorrowZeroAmount,
      );
    });

    it("reverts when user don't approve a sufficient amount of collateral tokens", async () => {
      await expect(
        env.baksDao.borrow(env.collateralToken.address, LOAN_PRINICPAL_AMOUNT),
      ).to.be.reverted;
    });

    it("mints correct amount of stablecoin and creates a loan", async () => {
      const { initialLoanToValueRatio } = await env.baksDao.collateralTokens(
        env.collateralToken.address,
      );

      const loan = await env.baksDao.calculateLoanByPrincipalAmount(
        env.collateralToken.address,
        LOAN_PRINICPAL_AMOUNT,
      );

      await expect(env.borrow(LOAN_PRINICPAL_AMOUNT))
        .to.emit(env.baksDao, "Borrow")
        .withArgs(
          LOAN_ID,
          env.user.address,
          env.collateralToken.address,
          LOAN_PRINICPAL_AMOUNT,
          loan.collateralAmount,
          initialLoanToValueRatio,
        );
      expect(await env.baksDao.getLoanToValueRatio(LOAN_ID)).to.be.equal(
        initialLoanToValueRatio,
      );
      expect(await env.baksDao.checkHealth(LOAN_ID)).to.be.equal(LoanHealth.Ok);

      expect(
        await env.collateralToken.balanceOf(env.operator.address),
      ).to.be.equal(loan.stabilityFee.div(e10(10)));
      expect(await env.$.balanceOf(env.baksDao.address)).to.be.equal(
        loan.stabilizationFee,
      );
      expect(await env.$.balanceOf(env.exchangeFund.address)).to.be.equal(
        loan.exchangeFee,
      );
      expect(await env.$.balanceOf(env.developmentFund.address)).to.be.equal(
        loan.developmentFee,
      );
      expect(await env.$.balanceOf(env.user.address)).to.be.equal(
        LOAN_PRINICPAL_AMOUNT,
      );
      expect(
        await env.collateralToken.balanceOf(env.baksDao.address),
      ).to.be.equal(loan.collateralAmount.div(e10(10)));

      const createdLoan = await env.baksDao.loanIds(env.user.address, 0);
      expect(createdLoan).to.be.equal(0);

      expect(await env.baksDao.getTotalValueLocked()).to.be.equal(
        loan.collateralAmount.mul(INITIAL_COL_PRICE).div(e10(18)),
      );

      expect(await env.baksDao.getLoans(env.user.address)).to.have.lengthOf(1);
    });
  });

  describe("loan interactions", () => {
    let collateralAmount: BigNumber;

    beforeEach(async () => {
      await env.borrow(LOAN_PRINICPAL_AMOUNT);
      collateralAmount = (await env.baksDao.loans(LOAN_ID)).collateralAmount;
    });

    describe("deposit", () => {
      it("reverts on inactive loan", async () => {
        await expect(
          env.baksDao.deposit(ethers.constants.MaxUint256, col(1)),
        ).to.be.revertedWith(BaksDAOErrors.InactiveLoan);
      });

      it("reverts when `amount` is zero", async () => {
        await expect(env.deposit(LOAN_ID, 0)).to.be.revertedWith(
          BaksDAOErrors.DepositZeroAmount,
        );
      });

      it("reverts when user don't approve a sufficient amount of collateral tokens", async () => {
        const tx = await env.collateralToken.approve(env.baksDao.address, 0);
        await tx.wait();
        await expect(env.baksDao.deposit(LOAN_ID, col(1))).to.be.reverted;
      });

      it("successfully deposits", async () => {
        const depositAmount = collateralAmount
          .div(2)
          .div(e10(DECIMALS - COL.DECIMALS));
        await expect(env.baksDao.deposit(LOAN_ID, depositAmount))
          .to.emit(env.baksDao, "Deposit")
          .withArgs(LOAN_ID, depositAmount.mul(e10(DECIMALS - COL.DECIMALS)));
      });
    });

    describe("repay", () => {
      it("reverts when loan is subject to liquidation", async () => {
        env.setCollateralPrice(usd(140));

        await expect(env.repay(LOAN_ID, 0)).to.be.revertedWith(
          BaksDAOErrors.LoanIsSubjectToLiquidation,
        );
      });

      it("reverts when `amount` is zero", async () => {
        await expect(env.repay(LOAN_ID, 0)).to.be.revertedWith(
          BaksDAOErrors.RepayZeroAmount,
        );
      });
    });

    describe("liquidation", () => {
      beforeEach(async () => {
        await env.$.transfer(
          env.liquidator.address,
          await env.$.balanceOf(env.user.address),
        );
      });

      it("should revert when loan is not subject to liquidation", async () => {
        await expect(env.baksDao.liquidate(LOAN_ID)).to.be.revertedWith(
          BaksDAOErrors.LoanNotSubjectToLiquidation,
        );
      });

      it("should liquidate loan", async () => {
        env.setCollateralPrice(usd(100));
        await expect(env.baksDao.liquidate(LOAN_ID))
          .to.emit(env.baksDao, "Liquidated")
          .withArgs(LOAN_ID);
      });
    });
  });
});
