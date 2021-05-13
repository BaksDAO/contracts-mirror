// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import "./FixedPointMath.sol";
import "./Loan.sol";
import {IERC20} from "./../interfaces/IERC20.sol";
import {IPriceOracle} from "./../interfaces/IPriceOracle.sol";

library CollateralToken {
    using FixedPointMath for uint256;

    struct Data {
        IERC20 collateralToken;
        IPriceOracle priceOracle;
        uint256 stabilityFee;
        uint256 stabilizationFee;
        uint256 exchangeFee;
        uint256 investmentFee;
        uint256 initialLoanToValueRatio;
        uint256 marginCallLoanToValueRatio;
        uint256 liquidationLoanToValueRatio;
        uint256 collateralAmount;
    }

    uint256 internal constant ONE = 100e16;

    function calculateLoanByPrincipalAmount(Data memory self, uint256 principalAmount)
        public
        view
        returns (Loan.Data memory)
    {
        uint256 collateralTokenPrice = self.priceOracle.getNormalizedPrice(self.collateralToken);

        uint256 restOfIssuance = principalAmount.mul(ONE - self.initialLoanToValueRatio).div(
            self.initialLoanToValueRatio
        );
        uint256 stabilizationFee = restOfIssuance.mul(self.stabilizationFee);
        uint256 exchangeFee = restOfIssuance.mul(self.exchangeFee);
        uint256 investmentFee = restOfIssuance.mul(self.investmentFee);

        uint256 collateralAmount = principalAmount.div(self.initialLoanToValueRatio.mul(collateralTokenPrice));
        uint256 stabilityFee = self.stabilityFee.mul(principalAmount).div(collateralTokenPrice);

        return
            Loan.Data({
                id: 0,
                isActive: true,
                borrower: msg.sender,
                collateralToken: self.collateralToken,
                isNativeCurrency: false,
                priceOracle: self.priceOracle,
                stabilityFee: stabilityFee,
                stabilizationFee: stabilizationFee,
                exchangeFee: exchangeFee,
                investmentFee: investmentFee,
                principalAmount: principalAmount,
                collateralAmount: collateralAmount,
                lastDepositAt: block.timestamp,
                lastRepaymentAt: block.timestamp
            });
    }

    function calculateLoanByCollateralAmount(Data memory self, uint256 collateralAmount)
        public
        view
        returns (Loan.Data memory)
    {
        uint256 collateralTokenPrice = self.priceOracle.getNormalizedPrice(self.collateralToken);
        uint256 principalAmount = collateralAmount.mul(self.initialLoanToValueRatio).mul(collateralTokenPrice);

        uint256 restOfIssuance = principalAmount.mul(ONE - self.initialLoanToValueRatio).div(
            self.initialLoanToValueRatio
        );
        uint256 stabilizationFee = restOfIssuance.mul(self.stabilizationFee);
        uint256 exchangeFee = restOfIssuance.mul(self.exchangeFee);
        uint256 investmentFee = restOfIssuance.mul(self.investmentFee);

        uint256 stabilityFee = self.stabilityFee.mul(principalAmount).div(collateralTokenPrice);

        return
            Loan.Data({
                id: 0,
                isActive: true,
                borrower: msg.sender,
                collateralToken: self.collateralToken,
                isNativeCurrency: false,
                priceOracle: self.priceOracle,
                stabilityFee: stabilityFee,
                stabilizationFee: stabilizationFee,
                exchangeFee: exchangeFee,
                investmentFee: investmentFee,
                principalAmount: principalAmount,
                collateralAmount: collateralAmount,
                lastDepositAt: block.timestamp,
                lastRepaymentAt: block.timestamp
            });
    }

    function calculateLoanBySecurityAmount(Data memory self, uint256 securityAmount)
        public
        view
        returns (Loan.Data memory)
    {
        uint256 collateralTokenPrice = self.priceOracle.getNormalizedPrice(self.collateralToken);
        uint256 c = self.stabilityFee.mul(self.initialLoanToValueRatio);
        uint256 principalAmount = securityAmount.mul(self.initialLoanToValueRatio).mul(collateralTokenPrice).div(
            c + ONE
        );
        return calculateLoanByPrincipalAmount(self, principalAmount);
    }

    function getCollateralValue(Data memory self) internal view returns (uint256 collateralValue) {
        uint256 collateralTokenPrice = self.priceOracle.getNormalizedPrice(self.collateralToken);
        collateralValue = self.collateralAmount.mul(collateralTokenPrice);
    }
}