# BAKSDAO

This repository contains the core smart contracts for the BAKSDAO Protocol.

## Licensing

The primary license for BAKSDAO Protocol is the Business Source License 1.1 (`BUSL-1.1`), see [`LICENSE`](./LICENSE).

### Exceptions

- Several files in `./contracts/interfaces/` (`IChainlinkAggregator.sol`, `IEIP2612.sol`, `IERC20.sol`, `IPriceOracle.sol`, `IWrappedNativeCurrency.sol`) are licensed under under `MIT` (as indicated in its SPDX header), see [`./contracts/interfaces/LICENSE_MIT`](contracts/interfaces/LICENSE_MIT)
- `./contracts/interfaces/UniswapV2.sol` is licensed under `GPL-3.0-or-later` (as indicated in their SPDX headers), see [contracts/interfaces/LICENSE_GPL](contracts/interfaces/LICENSE_GPL);
- Several files in `./contracts/libraries/` (`Address.sol`, `AmountNormalization.sol`, `EnumerableAddressSet.sol`, `FixedPointMath.sol`, `Math.sol`, `Proxy.sol`, `ReentrancyGuard.sol`, `SafeERC20.sol`) are licensed under `MIT` (as indicated in its SPDX header), see [`./contracts/libraries/LICENSE_MIT`](./contracts/libraries/LICENSE_MIT);
- All files in `./contracts/test/` remain unlicensed.
