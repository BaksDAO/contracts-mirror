// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./../BaseToken.sol";
import "./../interfaces/IWrappedNativeCurrency.sol";

error WrappedNativeCurrencyLowLevelCallFailed();

contract WrappedNativeCurrency is BaseToken, IWrappedNativeCurrency {
    function deposit() external payable override {
        _mint(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external override {
        _burn(msg.sender, amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) {
            revert WrappedNativeCurrencyLowLevelCallFailed();
        }
    }
}
