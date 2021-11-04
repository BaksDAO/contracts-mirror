// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import "./../interfaces/IPriceOracle.sol";
import "./../libraries/FixedPointMath.sol";
import {Governed} from "./../Governance.sol";
import {IERC20} from "./../interfaces/ERC20.sol";
import {Initializable} from "./../libraries/Upgradability.sol";

contract DummyPriceOracle is Initializable, Governed, IPriceOracle {
    IERC20 public wrappedNativeCurrency;

    mapping(IERC20 => uint256) public prices;

    function initialize(IERC20 _wrappedNativeCurrency) external initializer {
        setGovernor(msg.sender);

        wrappedNativeCurrency = _wrappedNativeCurrency;
    }

    function setPrice(IERC20 token, uint256 price) external onlyGovernor {
        prices[token] = price;
    }

    function getNormalizedPrice(IERC20 token) external view override returns (uint256 normalizedPrice) {
        normalizedPrice = prices[token];
    }
}
