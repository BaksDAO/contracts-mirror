// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./../BaseToken.sol";
import "./../interfaces/IWrappedNativeCurrency.sol";

error WrappedNativeCurrencyLowLevelCallFailed();

contract WrappedNativeCurrency is BaseToken, IWrappedNativeCurrency {
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        string memory _version,
        address _minter
    ) BaseToken(_name, _symbol, _decimals, _version, _minter) {}

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
