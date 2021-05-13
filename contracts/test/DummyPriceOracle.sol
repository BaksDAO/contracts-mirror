// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./../interfaces/IERC20.sol";
import "./../libraries/FixedPointMath.sol";
import {Governed} from "./../Governance.sol";
import "./../interfaces/IPriceOracle.sol";

contract DummyPriceOracle is Governed, IPriceOracle {
    IERC20 public immutable wrappedNativeCurrency;

    mapping(IERC20 => uint256) public prices;

    constructor(IERC20 _wrappedNativeCurrency) {
        wrappedNativeCurrency = _wrappedNativeCurrency;
    }

    function setPrice(IERC20 token, uint256 price) external onlyGovernor {
        prices[token] = price;
    }

    function getNormalizedPrice(IERC20 token) external view override returns (uint256 normalizedPrice) {
        normalizedPrice = prices[token];
    }
}
