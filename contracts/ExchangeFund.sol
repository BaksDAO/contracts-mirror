// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import "./libraries/AmountNormalization.sol";
import "./libraries/EnumerableAddressSet.sol";
import "./libraries/FixedPointMath.sol";
import "./libraries/ReentrancyGuard.sol";
import "./libraries/SafeERC20.sol";
import {Governed} from "./Governance.sol";
import {IERC20} from "./interfaces/IERC20.sol";
import {IPriceOracle} from "./interfaces/IPriceOracle.sol";
import {IUniswapV2Factory, IUniswapV2Router, IUniswapV2Pair} from "./interfaces/UniswapV2.sol";

/// @dev Thrown when trying to list depositable token that has zero decimals.
/// @param token The address of the token contract.
error ExchangeFundDepositableTokenZeroDecimals(IERC20 token);

/// @dev Thrown when trying to list depositable token that has too large decimals.
/// @param token The address of the token contract.
error ExchangeFundDepositableTokenTooLargeDecimals(IERC20 token, uint8 decimals);

/// @dev Thrown when trying to list depositable token that's already listed.
/// @param token The address of the token contract.
error ExchangeFundDepositableTokenAlreadyListed(IERC20 token);

/// @dev Thrown when trying to unlist depositable token that's not listed.
/// @param token The address of the token contract.
error ExchangeFundDepositableTokenNotListed(IERC20 token);

/// @dev Thrown when interacting with a token that's not allowed to be deposited.
/// @param token The address of the token contract.
error ExchangeFundTokenNotAllowedToBeDeposited(IERC20 token);

/// @dev Thrown when interacting with a token that's not allowed to be withdrawn.
/// @param token The address of the token contract.
error ExchangeFundTokenNotAllowedToBeWithdrawn(IERC20 token);

/// @dev Thrown when trying to salvage one of depositable tokens or stablecoin.
/// @param token The address of the token contract.
error ExchangeFundTokenNotAllowedToBeSalvaged(IERC20 token);

error ExchangeFundInsufficientDeposits();

error ExchangeFundInsufficientLiquidity();

error ExchangeFundSameTokenSwap(IERC20 token);

/// @dev Thrown when trying to swap token that's not allowed to be swapped.
/// @param token The address of the token contract.
error ExchangeFundTokenNotAllowedToBeSwapped(IERC20 token);

contract ExchangeFund is Governed, ReentrancyGuard {
    using AmountNormalization for IERC20;
    using EnumerableAddressSet for EnumerableAddressSet.Set;
    using FixedPointMath for uint256;
    using SafeERC20 for IERC20;

    uint256 internal constant ONE = 100e16;
    uint8 internal constant DECIMALS = 18;

    IERC20 public immutable wrappedNativeCurrency;

    IERC20 public immutable stablecoin;
    IPriceOracle public immutable priceOracle;
    IUniswapV2Router public immutable uniswapV2Router;

    address public immutable operator;

    uint256 public slippageTolerance = 5e15; // 0.5 %
    uint256 public swapDeadline = 20 minutes;

    mapping(address => mapping(IERC20 => uint256)) public deposits;
    mapping(address => mapping(IERC20 => uint256)) public liquidity;

    mapping(IERC20 => bool) public depositableTokens;
    EnumerableAddressSet.Set internal depositableTokensSet;

    event DepositableTokenListed(IERC20 indexed token, IUniswapV2Pair pair);
    event DepositableTokenUnlisted(IERC20 indexed token);

    event SlippageToleranceUpdated(uint256 slippageTolerance, uint256 newSlippageTolerance);
    event SwapDeadlineUpdated(uint256 swapDeadline, uint256 newSwapDeadline);

    event Deposit(address indexed account, IERC20 indexed token, uint256 amount);
    event Swap(address indexed account, IERC20 indexed tokenA, IERC20 indexed tokenB, uint256 amountA, uint256 amountB);
    event Invest(address indexed account, IERC20 indexed token, uint256 amount);
    event Divest(address indexed account, IERC20 indexed token, uint256 amount);
    event Withdrawal(address indexed account, IERC20 indexed token, uint256 amount);

    modifier tokenAllowedToBeDeposited(IERC20 token) {
        if (!depositableTokensSet.contains(address(token))) {
            revert ExchangeFundTokenNotAllowedToBeDeposited(token);
        }
        _;
    }

    modifier tokenAllowedToBeSwapped(IERC20 token) {
        if (token != stablecoin && !depositableTokensSet.contains(address(token))) {
            revert ExchangeFundTokenNotAllowedToBeSwapped(token);
        }
        _;
    }

    constructor(
        IERC20 _wrappedNativeCurrency,
        IERC20 _stablecoin,
        IPriceOracle _priceOracle,
        IUniswapV2Router _uniswapV2Router,
        address _operator
    ) {
        wrappedNativeCurrency = _wrappedNativeCurrency;

        stablecoin = _stablecoin;
        priceOracle = _priceOracle;
        uniswapV2Router = _uniswapV2Router;
        operator = _operator;

        _stablecoin.approve(address(_uniswapV2Router), type(uint256).max);
    }

    function deposit(IERC20 token, uint256 amount) external nonReentrant tokenAllowedToBeDeposited(token) {
        token.safeTransferFrom(msg.sender, address(this), amount);

        uint256 normalizedAmount = token.normalizeAmount(amount);
        deposits[msg.sender][token] += normalizedAmount;

        emit Deposit(msg.sender, token, normalizedAmount);
    }

    function swap(
        IERC20 tokenA,
        IERC20 tokenB,
        uint256 amount,
        bool useWrappedNativeCurrencyAsIntermediateToken
    ) external nonReentrant tokenAllowedToBeSwapped(tokenA) tokenAllowedToBeSwapped(tokenB) {
        uint256 normalizedAmount = tokenA.normalizeAmount(amount);
        if (normalizedAmount > deposits[msg.sender][tokenA]) {
            revert ExchangeFundInsufficientDeposits();
        }

        if (tokenA == tokenB) {
            revert ExchangeFundSameTokenSwap(tokenA);
        }

        address[] memory path = new address[](useWrappedNativeCurrencyAsIntermediateToken ? 3 : 2);
        path[0] = address(tokenA);
        path[1] = useWrappedNativeCurrencyAsIntermediateToken ? address(wrappedNativeCurrency) : address(tokenB);
        if (useWrappedNativeCurrencyAsIntermediateToken) {
            path[2] = address(tokenB);
        }

        uint256[] memory amounts = uniswapV2Router.getAmountsOut(amount, path);
        uint256 normalizedAmountOut = tokenB.normalizeAmount(amounts[amounts.length - 1]);

        amounts = uniswapV2Router.swapExactTokensForTokens(
            amount,
            tokenB.denormalizeAmount(normalizedAmountOut.mul(ONE - slippageTolerance)),
            path,
            address(this),
            block.timestamp + swapDeadline
        );

        uint256 normalizedTokenAAmount = tokenA.normalizeAmount(amounts[0]);
        uint256 normalizedTokenBAmount = tokenB.normalizeAmount(amounts[amounts.length - 1]);

        deposits[msg.sender][tokenA] -= normalizedTokenAAmount;
        deposits[msg.sender][tokenB] += normalizedTokenBAmount;

        emit Swap(msg.sender, tokenA, tokenB, normalizedTokenAAmount, normalizedTokenBAmount);
    }

    function invest(IERC20 token, uint256 amount) external nonReentrant {
        uint256 normalizedAmount = token.normalizeAmount(amount);
        if (normalizedAmount > deposits[msg.sender][token]) {
            revert ExchangeFundInsufficientDeposits();
        }

        uint256 tokenValue = quote(token, amount);
        (, uint256 amountSent, uint256 liquidityMinted) = uniswapV2Router.addLiquidity(
            stablecoin,
            token,
            tokenValue,
            amount,
            tokenValue.mul(ONE - slippageTolerance),
            token.denormalizeAmount(normalizedAmount.mul(ONE - slippageTolerance)),
            address(this),
            block.timestamp + swapDeadline
        );

        deposits[msg.sender][token] -= token.normalizeAmount(amountSent);
        liquidity[msg.sender][token] += liquidityMinted;

        emit Invest(msg.sender, token, normalizedAmount);
    }

    function divest(IERC20 token, uint256 amount) external nonReentrant {
        if (amount > liquidity[msg.sender][token]) {
            revert ExchangeFundInsufficientLiquidity();
        }

        (, uint256 amountReceived) = uniswapV2Router.removeLiquidity(
            stablecoin,
            token,
            amount,
            0,
            0,
            address(this),
            block.timestamp + swapDeadline
        );

        deposits[msg.sender][token] += token.normalizeAmount(amountReceived);
        liquidity[msg.sender][token] -= amount;

        emit Divest(msg.sender, token, amount);
    }

    function withdraw(IERC20 token, uint256 amount) external nonReentrant {
        if (token == stablecoin) {
            revert ExchangeFundTokenNotAllowedToBeWithdrawn(token);
        }

        uint256 normalizedAmount = token.normalizeAmount(amount);
        if (normalizedAmount > deposits[msg.sender][token]) {
            revert ExchangeFundInsufficientDeposits();
        }

        deposits[msg.sender][token] -= normalizedAmount;
        token.safeTransfer(msg.sender, amount);

        emit Withdrawal(msg.sender, token, normalizedAmount);
    }

    function listDepositableToken(IERC20 token) external onlyGovernor {
        if (depositableTokensSet.contains(address(token))) {
            revert ExchangeFundDepositableTokenAlreadyListed(token);
        }

        uint8 decimals = token.decimals();
        if (decimals == 0) {
            revert ExchangeFundDepositableTokenZeroDecimals(token);
        }
        if (decimals > DECIMALS) {
            revert ExchangeFundDepositableTokenTooLargeDecimals(token, decimals);
        }

        if (depositableTokensSet.add(address(token))) {
            token.approve(address(uniswapV2Router), type(uint256).max);

            IUniswapV2Factory uniswapV2Factory = uniswapV2Router.factory();
            IUniswapV2Pair uniswapV2Pair = uniswapV2Factory.getPair(stablecoin, token);
            if (address(uniswapV2Pair) == address(0)) {
                uniswapV2Pair = uniswapV2Factory.createPair(stablecoin, token);
            }
            uniswapV2Pair.approve(address(uniswapV2Router), type(uint256).max);

            depositableTokens[token] = true;
            emit DepositableTokenListed(token, uniswapV2Pair);
        }
    }

    function unlistDepositableToken(IERC20 token) external onlyGovernor {
        if (!depositableTokensSet.contains(address(token))) {
            revert ExchangeFundDepositableTokenNotListed(token);
        }

        if (depositableTokensSet.remove(address(token))) {
            token.approve(address(uniswapV2Router), 0);

            IUniswapV2Factory uniswapV2Factory = uniswapV2Router.factory();
            IUniswapV2Pair uniswapV2Pair = uniswapV2Factory.getPair(stablecoin, token);
            if (address(uniswapV2Pair) != address(0)) {
                uniswapV2Pair.approve(address(uniswapV2Router), 0);
            }

            delete depositableTokens[token];
            emit DepositableTokenUnlisted(token);
        }
    }

    function setSlippageTolerance(uint256 newSlippageTolerance) external onlyGovernor {
        emit SlippageToleranceUpdated(slippageTolerance, newSlippageTolerance);
        slippageTolerance = newSlippageTolerance;
    }

    function setSwapDeadline(uint256 newSwapDeadline) external onlyGovernor {
        emit SwapDeadlineUpdated(swapDeadline, newSwapDeadline);
        swapDeadline = newSwapDeadline;
    }

    function salvage(IERC20 token) external onlyGovernor {
        address tokenAddress = address(token);
        if (token == stablecoin || depositableTokensSet.contains(tokenAddress)) {
            revert ExchangeFundTokenNotAllowedToBeSalvaged(token);
        }
        token.safeTransfer(operator, token.balanceOf(address(this)));
    }

    function getDepositableTokens() external view returns (IERC20[] memory tokens) {
        uint256 length = depositableTokensSet.elements.length;
        tokens = new IERC20[](length);

        for (uint256 i = 0; i < length; i++) {
            tokens[i] = IERC20(depositableTokensSet.elements[i]);
        }
    }

    function quote(IERC20 token, uint256 amount) public view returns (uint256 stablecoinAmount) {
        IUniswapV2Pair uniswapV2Pair = uniswapV2Router.factory().getPair(stablecoin, token);

        (uint256 reserveA, uint256 reserveB, ) = uniswapV2Pair.getReserves();
        if (reserveA == 0 || reserveB == 0) {
            stablecoinAmount = token.normalizeAmount(amount).mul(priceOracle.getNormalizedPrice(token));
            return stablecoinAmount;
        }

        stablecoinAmount = address(stablecoin) < address(token)
            ? uniswapV2Router.quote(amount, reserveB, reserveA)
            : uniswapV2Router.quote(amount, reserveA, reserveB);
    }
}
