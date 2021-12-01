// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.10;

interface IDepositary {
    function getTotalValueLocked() external view returns (uint256 totalValueLocked);
}
