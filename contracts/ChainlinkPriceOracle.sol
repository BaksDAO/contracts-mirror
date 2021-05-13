// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import "./interfaces/IChainlinkAggregator.sol";
import "./interfaces/IERC20.sol";
import "./libraries/FixedPointMath.sol";
import {Governed} from "./Governance.sol";
import "./interfaces/IPriceOracle.sol";

contract ChainlinkPriceOracle is Governed, IPriceOracle {
    using FixedPointMath for uint256;

    uint256 internal constant DIRECT_CONVERSION_PATH_SCALE = 1e10;
    uint256 internal constant INTERMEDIATE_CONVERSION_PATH_SCALE = 1e8;

    IERC20 public immutable wrappedNativeCurrency;

    mapping(IERC20 => IChainlinkAggregator) public nativeAggregators;
    mapping(IERC20 => IChainlinkAggregator) public usdAggregators;

    event AggregatorSet(IERC20 token, IChainlinkAggregator aggregator, bool isQuoteNative);

    constructor(IERC20 _wrappedNativeCurrency) {
        wrappedNativeCurrency = _wrappedNativeCurrency;
    }

    function setAggregator(
        IERC20 token,
        IChainlinkAggregator aggregator,
        bool isQuoteNative
    ) external onlyGovernor {
        if (isQuoteNative) {
            nativeAggregators[token] = aggregator;
        } else {
            usdAggregators[token] = aggregator;
        }

        emit AggregatorSet(token, aggregator, isQuoteNative);
    }

    function getNormalizedPrice(IERC20 token) external view override returns (uint256 normalizedPrice) {
        IChainlinkAggregator aggregator = usdAggregators[token];
        if (address(aggregator) == address(0)) {
            uint256 tokenToNativeCurrencyPrice = getTokenToNativeCurrencyPrice(token);
            uint256 nativeCurrencyToUsdPrice = getNativeCurrencyToUsdPrice();
            return tokenToNativeCurrencyPrice.mulDiv(nativeCurrencyToUsdPrice, INTERMEDIATE_CONVERSION_PATH_SCALE);
        }

        normalizedPrice = getLatestPrice(token, aggregator) * DIRECT_CONVERSION_PATH_SCALE;
    }

    function getTokenToNativeCurrencyPrice(IERC20 token) internal view returns (uint256 price) {
        IChainlinkAggregator aggregator = nativeAggregators[token];
        if (address(aggregator) == address(0)) {
            revert PriceOracleTokenUnknown(token);
        }

        price = getLatestPrice(token, aggregator);
    }

    function getNativeCurrencyToUsdPrice() internal view returns (uint256 price) {
        IChainlinkAggregator aggregator = usdAggregators[wrappedNativeCurrency];
        if (address(aggregator) == address(0)) {
            revert PriceOracleTokenUnknown(wrappedNativeCurrency);
        }

        price = getLatestPrice(wrappedNativeCurrency, aggregator);
    }

    function getLatestPrice(IERC20 token, IChainlinkAggregator aggregator) internal view returns (uint256 price) {
        (uint80 roundId, int256 answer, , , uint80 answeredInRound) = aggregator.latestRoundData();
        if (answer <= 0) {
            revert PriceOracleInvalidPrice(token, answer);
        }

        price = uint256(answer);
        if (answeredInRound < roundId) {
            revert PriceOracleStalePrice(token, price);
        }
    }
}
