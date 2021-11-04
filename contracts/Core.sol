// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import {Initializable} from "./libraries/Upgradability.sol";
import {Governed} from "./Governance.sol";

/// @dev Thrown when trying to set platform fees that don't sum up to one.
/// @param stabilizationFee The stabilization fee that was tried to set.
/// @param exchangeFee The stabilization fee that was tried to set.
/// @param developmentFee The stabilization fee that was tried to set.
error BaksDAOPlatformFeesDontSumUpToOne(uint256 stabilizationFee, uint256 exchangeFee, uint256 developmentFee);

interface ICore {
    event MinimumPrincipalAmountUpdated(uint256 minimumPrincipalAmount, uint256 newMinimumPrincipalAmount);
    event StabilityFeeUpdated(uint256 stabilityFee, uint256 newStabilityFee);
    event RebalancingThresholdUpdated(uint256 rebalancingThreshold, uint256 newRebalancingThreshold);
    event PlatformFeesUpdated(
        uint256 stabilizationFee,
        uint256 newStabilizationFee,
        uint256 exchangeFee,
        uint256 newExchangeFee,
        uint256 developmentFee,
        uint256 newDevelopmentFee
    );
    event MarginCallLoanToValueRatioUpdated(uint256 marginCallLoanToValueRatio, uint256 newMarginCallLoanToValueRatio);
    event LiquidationLoanToValueRatioUpdated(
        uint256 liqudationLoanToValueRatio,
        uint256 newLiquidationLoanToValueRatio
    );

    function minimumPrincipalAmount() external view returns (uint256);

    function stabilityFee() external view returns (uint256);

    function stabilizationFee() external view returns (uint256);

    function exchangeFee() external view returns (uint256);

    function developmentFee() external view returns (uint256);

    function marginCallLoanToValueRatio() external view returns (uint256);

    function liquidationLoanToValueRatio() external view returns (uint256);

    function rebalancingThreshold() external view returns (uint256);
}

contract Core is Initializable, Governed, ICore {
    uint256 internal constant ONE = 100e16;

    uint256 public override minimumPrincipalAmount;
    uint256 public override stabilityFee;
    uint256 public override stabilizationFee;
    uint256 public override exchangeFee;
    uint256 public override developmentFee;
    uint256 public override marginCallLoanToValueRatio;
    uint256 public override liquidationLoanToValueRatio;
    uint256 public override rebalancingThreshold;

    function initialize() external initializer {
        setGovernor(msg.sender);

        minimumPrincipalAmount = 50e18; // 50 BAKS
        stabilityFee = 3e16; // 3 %
        stabilizationFee = 85e16; // 85 %
        exchangeFee = 15e16; // 15 %
        developmentFee = 0;
        marginCallLoanToValueRatio = 75e16; // 75 %
        liquidationLoanToValueRatio = 83e16; // 83 %
        rebalancingThreshold = 1e16; // 1 %
    }

    function setMinimumPrincipalAmount(uint256 newMinimumPrincipalAmount) external onlyGovernor {
        emit StabilityFeeUpdated(minimumPrincipalAmount, newMinimumPrincipalAmount);
        minimumPrincipalAmount = newMinimumPrincipalAmount;
    }

    function setStabilityFee(uint256 newStabilityFee) external onlyGovernor {
        emit StabilityFeeUpdated(stabilityFee, newStabilityFee);
        stabilityFee = newStabilityFee;
    }

    function setPlatformFees(
        uint256 newStabilizationFee,
        uint256 newExchangeFee,
        uint256 newDevelopmentFee
    ) external onlyGovernor {
        if (newStabilizationFee + newExchangeFee + newDevelopmentFee != ONE) {
            revert BaksDAOPlatformFeesDontSumUpToOne(newStabilizationFee, newExchangeFee, newDevelopmentFee);
        }
        emit PlatformFeesUpdated(
            stabilizationFee,
            newStabilizationFee,
            exchangeFee,
            newExchangeFee,
            developmentFee,
            newDevelopmentFee
        );
        stabilizationFee = newStabilizationFee;
        exchangeFee = newExchangeFee;
        developmentFee = newDevelopmentFee;
    }

    function setMarginCallLoanToValueRatio(uint256 newMarginCallLoanToValueRatio) external onlyGovernor {
        emit MarginCallLoanToValueRatioUpdated(marginCallLoanToValueRatio, newMarginCallLoanToValueRatio);
        marginCallLoanToValueRatio = newMarginCallLoanToValueRatio;
    }

    function setLiquidationLoanToValueRatio(uint256 newLiquidationLoanToValueRatio) external onlyGovernor {
        emit LiquidationLoanToValueRatioUpdated(liquidationLoanToValueRatio, newLiquidationLoanToValueRatio);
        liquidationLoanToValueRatio = newLiquidationLoanToValueRatio;
    }

    function setRebalancingThreshold(uint256 newRebalancingThreshold) external onlyGovernor {
        emit RebalancingThresholdUpdated(rebalancingThreshold, newRebalancingThreshold);
        rebalancingThreshold = newRebalancingThreshold;
    }
}
