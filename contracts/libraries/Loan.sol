// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import "./FixedPointMath.sol";
import {IERC20} from "./../interfaces/IERC20.sol";
import {IPriceOracle} from "./../interfaces/IPriceOracle.sol";

library Loan {
    using FixedPointMath for uint256;

    struct Data {
        uint256 id;
        bool isActive;
        address borrower;
        IERC20 collateralToken;
        bool isNativeCurrency;
        IPriceOracle priceOracle;
        uint256 stabilityFee;
        uint256 stabilizationFee;
        uint256 exchangeFee;
        uint256 investmentFee;
        uint256 principalAmount;
        uint256 collateralAmount;
        uint256 lastDepositAt;
        uint256 lastRepaymentAt;
    }

    function getCollateralValue(Data memory self) internal view returns (uint256 collateralValue) {
        uint256 collateralTokenPrice = self.priceOracle.getNormalizedPrice(self.collateralToken);
        collateralValue = self.collateralAmount.mul(collateralTokenPrice);
    }

    function calculateLoanToValueRatio(Data memory self) internal view returns (uint256 loanToValueRatio) {
        if (self.principalAmount == 0) {
            return 0;
        }
        if (self.collateralAmount == 0) {
            return type(uint256).max;
        }

        loanToValueRatio = self.principalAmount.div(getCollateralValue(self));
    }
}
