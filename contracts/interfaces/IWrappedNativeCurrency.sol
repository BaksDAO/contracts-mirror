// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./IERC20.sol";

interface IWrappedNativeCurrency is IERC20 {
    function deposit() external payable;

    function withdraw(uint256 amount) external;
}
