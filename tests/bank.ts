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

describe("Bank", () => {
  let env: Environment;

  beforeEach(async () => {
    env = await setupEnvironment();
  });

  /* it("correctly constructed", async () => {
    expect(await env.bank.stablecoin()).to.equal(env.$.address);
    expect(await env.bank.priceOracle()).to.equal(env.priceOracle.address);
    expect(await env.bank.operator()).to.equal(env.operator.address);
    expect(await env.bank.liquidator()).to.equal(env.liquidator.address);
    expect(await env.bank.exchangeFund()).to.equal(env.exchangeFund.address);
    expect(await env.bank.developmentFund()).to.equal(
      env.developmentFund.address,
    );
  }); */

  describe("governed functions", () => {
    it("lists and unlists token as collateral", async () => {
      await expect(
        env.governedBank.unlistCollateralToken(env.collateralToken.address),
      )
        .to.emit(env.bank, "CollateralTokenUnlisted")
        .withArgs(env.collateralToken.address);

      expect(await env.bank.getAllowedCollateralTokens()).to.be.empty;

      await expect(
        env.governedBank.listCollateralToken(
          env.collateralToken.address,
          DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
        ),
      )
        .to.emit(env.bank, "CollateralTokenListed")
        .withArgs(env.collateralToken.address)
        .to.emit(env.bank, "InitialLoanToValueRatioUpdated")
        .withArgs(
          env.collateralToken.address,
          0,
          DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
        );

      expect(await env.bank.getAllowedCollateralTokens()).to.have.lengthOf(1);
    });

    describe("initial loan-to-value ratio", () => {
      it("reverts when token is not allowed as collateral", async () => {
        const token = generateRandomAddress();
        const newInitialLoanToValueRatio = percent(75);

        await expect(
          env.governedBank.setInitialLoanToValueRatio(
            token,
            newInitialLoanToValueRatio,
          ),
        ).to.be.revertedWith(BaksDAOErrors.CollateralTokenNotListed);
      });

      it("reverts when new initial loan-to-value ratio equal or higher than margin call loan-to-value ratio", async () => {
        const { marginCallLoanToValueRatio } = await env.bank.collateralTokens(
          env.collateralToken.address,
        );

        await expect(
          env.governedBank.setInitialLoanToValueRatio(
            env.collateralToken.address,
            marginCallLoanToValueRatio,
          ),
        ).to.be.revertedWith(BaksDAOErrors.InitialLoanToValueRatioTooHigh);

        await expect(
          env.governedBank.setInitialLoanToValueRatio(
            env.collateralToken.address,
            marginCallLoanToValueRatio.add(1),
          ),
        ).to.be.revertedWith(BaksDAOErrors.InitialLoanToValueRatioTooHigh);
      });

      it("updates initial loan-to-value ratio", async () => {
        const { marginCallLoanToValueRatio } = await env.bank.collateralTokens(
          env.collateralToken.address,
        );
        let initialLoanToValueRatio = (
          await env.bank.collateralTokens(env.collateralToken.address)
        ).initialLoanToValueRatio;
        const newInitialLoanToValueRatio = marginCallLoanToValueRatio.sub(1);

        await expect(
          env.governedBank.setInitialLoanToValueRatio(
            env.collateralToken.address,
            newInitialLoanToValueRatio,
          ),
        )
          .to.emit(env.bank, "InitialLoanToValueRatioUpdated")
          .withArgs(
            env.collateralToken.address,
            initialLoanToValueRatio,
            newInitialLoanToValueRatio,
          );

        initialLoanToValueRatio = (
          await env.bank.collateralTokens(env.collateralToken.address)
        ).initialLoanToValueRatio;
        expect(initialLoanToValueRatio).to.be.equal(newInitialLoanToValueRatio);
      });
    });

    /* describe("salvation", () => {
      it("reverts when trying to salvage one of collateral tokens", async () => {
        await expect(
          env.governedBank.salvage(env.collateralToken.address),
        ).to.be.revertedWith(BaksDAOErrors.TokenNotAllowedToBeSalvaged);
      });

      it("reverts when trying to salvage stablecoin", async () => {
        await expect(
          env.governedBank.salvage(env.$.address),
        ).to.be.revertedWith(BaksDAOErrors.TokenNotAllowedToBeSalvaged);
      });
    }); */
  });

  describe("borrow", () => {
    it("reverts when token is not allowed as collateral", async () => {
      const token = generateRandomAddress();

      await expect(env.bank.borrow(token, usd(100))).to.be.revertedWith(
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
        env.bank.borrow(env.collateralToken.address, LOAN_PRINICPAL_AMOUNT),
      ).to.be.reverted;
    });

    it("mints correct amount of stablecoin and creates a loan", async () => {
      const { initialLoanToValueRatio } = await env.bank.collateralTokens(
        env.collateralToken.address,
      );

      const { loan, exchangeFee, developmentFee, stabilityFee } =
        await env.bank.calculateLoanByPrincipalAmount(
          env.collateralToken.address,
          LOAN_PRINICPAL_AMOUNT,
        );

      await expect(env.borrow(LOAN_PRINICPAL_AMOUNT))
        .to.emit(env.bank, "Borrow")
        .withArgs(
          LOAN_ID,
          env.user.address,
          env.collateralToken.address,
          LOAN_PRINICPAL_AMOUNT,
          loan.collateralAmount,
          initialLoanToValueRatio,
        );
      expect(await env.bank.getLoanToValueRatio(LOAN_ID)).to.be.equal(
        initialLoanToValueRatio,
      );
      expect(await env.bank.checkHealth(LOAN_ID)).to.be.equal(LoanHealth.Ok);

      expect(
        await env.collateralToken.balanceOf(env.operator.address),
      ).to.be.equal(stabilityFee.div(e10(10)));
      expect(await env.$.balanceOf(env.bank.address)).to.be.equal(
        loan.stabilizationFee,
      );
      expect(await env.$.balanceOf(env.exchangeFund.address)).to.be.equal(
        exchangeFee,
      );
      expect(await env.$.balanceOf(env.developmentFund.address)).to.be.equal(
        developmentFee,
      );
      expect(await env.$.balanceOf(env.user.address)).to.be.equal(
        LOAN_PRINICPAL_AMOUNT,
      );
      expect(await env.collateralToken.balanceOf(env.bank.address)).to.be.equal(
        loan.collateralAmount.div(e10(10)),
      );

      const createdLoan = await env.bank.loanIds(env.user.address, 0);
      expect(createdLoan).to.be.equal(0);

      expect(await env.bank["getTotalValueLocked()"]()).to.be.equal(
        loan.collateralAmount.mul(INITIAL_COL_PRICE).div(e10(18)),
      );

      expect(await env.bank.getLoans(env.user.address)).to.have.lengthOf(1);
    });
  });

  describe("loan interactions", () => {
    let collateralAmount: BigNumber;

    beforeEach(async () => {
      await env.borrow(LOAN_PRINICPAL_AMOUNT);
      collateralAmount = (await env.bank.loans(LOAN_ID)).collateralAmount;
    });

    describe("deposit", () => {
      it("reverts on inactive loan", async () => {
        await expect(
          env.bank.deposit(ethers.constants.MaxUint256, col(1)),
        ).to.be.revertedWith(BaksDAOErrors.InactiveLoan);
      });

      it("reverts when `amount` is zero", async () => {
        await expect(env.deposit(LOAN_ID, 0)).to.be.revertedWith(
          BaksDAOErrors.DepositZeroAmount,
        );
      });

      it("reverts when user don't approve a sufficient amount of collateral tokens", async () => {
        const tx = await env.collateralToken.approve(env.bank.address, 0);
        await tx.wait();
        await expect(env.bank.deposit(LOAN_ID, col(1))).to.be.reverted;
      });

      it("successfully deposits", async () => {
        const depositAmount = collateralAmount
          .div(2)
          .div(e10(DECIMALS - COL.DECIMALS));
        await expect(env.bank.deposit(LOAN_ID, depositAmount))
          .to.emit(env.bank, "Deposit")
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
        await expect(env.bank.liquidate(LOAN_ID)).to.be.revertedWith(
          BaksDAOErrors.LoanNotSubjectToLiquidation,
        );
      });

      it("should liquidate loan", async () => {
        env.setCollateralPrice(usd(100));
        await expect(env.bank.liquidate(LOAN_ID))
          .to.emit(env.bank, "Liquidated")
          .withArgs(LOAN_ID);
      });
    });
  });
});
