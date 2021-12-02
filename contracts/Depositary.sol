// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.10;

import "./libraries/AmountNormalization.sol";
import "./libraries/Deposit.sol";
import "./libraries/EnumerableAddressSet.sol";
import "./libraries/FixedPointMath.sol";
import "./libraries/Magister.sol";
import "./libraries/Math.sol";
import "./libraries/Pool.sol";
import "./libraries/SafeERC20.sol";
import {CoreInside, ICore} from "./Core.sol";
import {Governed} from "./Governance.sol";
import {IERC20} from "./interfaces/ERC20.sol";
import {Initializable} from "./libraries/Upgradability.sol";
import {IPriceOracle} from "./interfaces/IPriceOracle.sol";
import "./interfaces/IDepositary.sol";
import "./interfaces/IBank.sol";

error BaksDAOMagisterAlreadyWhitelisted(address magister);
error BaksDAOMagisterBlacklisted(address magister);
error BaksDAOOnlyDepositorOrMagisterAllowed();
error BaksDAOWithdrawAmountExceedsPrincipal();
error BaksDAOBelowMinimumMagisterDepositAmount();

contract Depositary is CoreInside, Governed, IDepositary, Initializable {
    using AmountNormalization for IERC20;
    using Deposit for Deposit.Data;
    using EnumerableAddressSet for EnumerableAddressSet.Set;
    using FixedPointMath for uint256;
    using Magister for Magister.Data;
    using Pool for Pool.Data;
    using SafeERC20 for IERC20;

    uint256 internal constant ONE = 100e16;

    mapping(address => Magister.Data) public magisters;
    EnumerableAddressSet.Set internal magistersSet;

    Pool.Data[] public pools;

    Deposit.Data[] public deposits;
    mapping(uint256 => mapping(address => uint256)) public currentDepositIds;

    event MagisterWhitelisted(address indexed magister);
    event MagisterBlacklisted(address indexed magister);

    function initialize(ICore _core) external initializer {
        initializeCoreInside(_core);
        setGovernor(msg.sender);

        // Add guard pool and deposit
        deposits.push(
            Deposit.Data({
                id: 0,
                isActive: false,
                depositor: address(0),
                magister: address(0),
                poolId: 0,
                principal: 0,
                depositorTotalAccruedRewards: 0,
                depositorWithdrawnRewards: 0,
                magisterTotalAccruedRewards: 0,
                magisterWithdrawnRewards: 0,
                createdAt: block.timestamp,
                lastDepositAt: block.timestamp,
                lastInteractionAt: block.timestamp,
                closedAt: block.timestamp
            })
        );

        pools.push(
            Pool.Data({
                id: 0,
                depositToken: IERC20(address(0)),
                priceOracle: IPriceOracle(core.priceOracle()),
                isCompounding: false,
                depositsAmount: 0,
                depositorApr: 0,
                magisterApr: 0,
                depositorBonusApr: 0,
                magisterBonusApr: 0
            })
        );
    }

    function deposit(uint256 poolId, uint256 amount) external {
        deposit(poolId, amount, address(this));
    }

    function withdraw(uint256 depositId, uint256 amount) external {
        Deposit.Data storage d = deposits[depositId];
        Pool.Data storage p = pools[d.poolId];

        if (!(msg.sender == d.depositor || msg.sender == d.magister)) {
            revert BaksDAOOnlyDepositorOrMagisterAllowed();
        }

        uint256 normalizedAmount = p.depositToken.normalizeAmount(amount);
        accrueRewards(d.id);

        uint256 magisterAmount = Math.min(d.magisterTotalAccruedRewards - d.magisterWithdrawnRewards, normalizedAmount);
        (
            uint256 depositorReward,
            uint256 depositorBonusReward,
            uint256 magisterReward,
            uint256 magisterBonusReward
        ) = splitRewards(d.poolId, d.depositorTotalAccruedRewards - d.depositorWithdrawnRewards, magisterAmount);

        if (msg.sender == d.magister) {
            IERC20(core.baks()).safeTransfer(d.magister, magisterReward);
            if (magisterBonusReward > 0) {
                IERC20(core.voice()).safeTransfer(d.magister, magisterBonusReward);
            }

            d.magisterWithdrawnRewards += magisterAmount;
        } else {
            if (normalizedAmount > d.principal) {
                revert BaksDAOWithdrawAmountExceedsPrincipal();
            }

            uint256 fee;
            if (p.isCompounding) {
                fee = core.workFee();

                if (block.timestamp < d.lastDepositAt + core.earlyWithdrawalPeriod()) {
                    fee += core.earlyWithdrawalFee();
                }

                depositorReward = depositorReward.mul(ONE - fee);
            }

            if (p.depositToken != IERC20(core.baks())) {
                p.depositToken.safeTransfer(d.depositor, normalizedAmount);
            }
            IERC20(core.baks()).safeTransfer(
                d.depositor,
                p.depositToken == IERC20(core.baks()) ? normalizedAmount + depositorReward : depositorReward
            );
            if (depositorBonusReward > 0) {
                IERC20(core.voice()).safeTransfer(d.depositor, depositorBonusReward);
            }

            p.depositsAmount -= normalizedAmount;
            d.principal -= normalizedAmount;
            d.depositorWithdrawnRewards += d.depositorTotalAccruedRewards - d.depositorWithdrawnRewards;
        }

        d.lastInteractionAt = block.timestamp;
        if (d.principal == 0) {
            d.isActive = false;
            d.closedAt = block.timestamp;
            delete currentDepositIds[d.poolId][msg.sender];
        }
    }

    function whitelistMagister(address magister) external onlyGovernor {
        if (magistersSet.contains(magister)) {
            revert BaksDAOMagisterAlreadyWhitelisted(magister);
        }

        if (magistersSet.add(magister)) {
            Magister.Data storage m = magisters[magister];
            m.addr = magister;
            if (m.createdAt == 0) {
                m.createdAt = block.timestamp;
            }
            m.isActive = true;

            emit MagisterWhitelisted(magister);
        }
    }

    function blacklistMagister(address magister) external onlyGovernor {
        if (!magistersSet.contains(magister)) {
            revert BaksDAOMagisterBlacklisted(magister);
        }

        if (magistersSet.remove(magister)) {
            magisters[magister].isActive = false;
            emit MagisterBlacklisted(magister);
        }
    }

    function addPool(
        IERC20 depositToken,
        bool isCompounding,
        uint256 depositorApr,
        uint256 magisterApr,
        uint256 depositorBonusApr,
        uint256 magisterBonusApr
    ) external onlyGovernor {
        uint256 poolId = pools.length;
        pools.push(
            Pool.Data({
                id: poolId,
                depositToken: depositToken,
                priceOracle: IPriceOracle(core.priceOracle()),
                isCompounding: isCompounding,
                depositsAmount: 0,
                depositorApr: depositorApr,
                magisterApr: magisterApr,
                depositorBonusApr: depositorBonusApr,
                magisterBonusApr: magisterBonusApr
            })
        );
    }

    function updatePool(
        uint256 poolId,
        bool isCompounding,
        uint256 depositorApr,
        uint256 magisterApr,
        uint256 depositorBonusApr,
        uint256 magisterBonusApr
    ) external onlyGovernor {
        Pool.Data storage pool = pools[poolId];
        pool.isCompounding = isCompounding;
        pool.depositorApr = depositorApr;
        pool.magisterApr = magisterApr;
        pool.depositorBonusApr = depositorBonusApr;
        pool.magisterBonusApr = magisterBonusApr;
    }

    function getActiveMagisterAddresses() external view returns (address[] memory activeMagisterAddresses) {
        activeMagisterAddresses = magistersSet.elements;
    }

    function getActiveMagisters() external view returns (Magister.Data[] memory activeMagisters) {
        uint256 length = magistersSet.elements.length;
        activeMagisters = new Magister.Data[](length);

        for (uint256 i = 0; i < length; i++) {
            activeMagisters[i] = magisters[magistersSet.elements[i]];
        }
    }

    function getPoolsCount() external view returns (uint256) {
        return pools.length;
    }

    function getPools() external view returns (Pool.Data[] memory) {
        return pools;
    }

    function getMagisterDepositIds(address magister) external view returns (uint256[] memory) {
        return magisters[magister].depositIds;
    }

    function getTotalValueLocked() external view returns (uint256 totalValueLocked) {
        for (uint256 i = 0; i < pools.length; i++) {
            totalValueLocked += pools[i].getDepositsValue();
        }
    }

    function deposit(
        uint256 poolId,
        uint256 amount,
        address magister
    ) public {
        if (magister == msg.sender || !(magister == address(this) || magisters[magister].isActive)) {
            revert BaksDAOMagisterBlacklisted(magister);
        }

        Pool.Data storage p = pools[poolId];
        p.depositToken.safeTransferFrom(msg.sender, address(this), amount);

        uint256 normalizedAmount = p.depositToken.normalizeAmount(amount);
        p.depositsAmount += normalizedAmount;

        if (currentDepositIds[poolId][msg.sender] == 0) {
            uint256 id = deposits.length;
            deposits.push(
                Deposit.Data({
                    id: id,
                    isActive: true,
                    magister: magister,
                    depositor: msg.sender,
                    poolId: poolId,
                    principal: normalizedAmount,
                    depositorTotalAccruedRewards: 0,
                    depositorWithdrawnRewards: 0,
                    magisterTotalAccruedRewards: 0,
                    magisterWithdrawnRewards: 0,
                    createdAt: block.timestamp,
                    lastDepositAt: block.timestamp,
                    lastInteractionAt: block.timestamp,
                    closedAt: 0
                })
            );

            currentDepositIds[poolId][msg.sender] = id;
            if (magister != address(this)) {
                uint256 depositTokenPrice = IPriceOracle(core.priceOracle()).getNormalizedPrice(p.depositToken);
                if (normalizedAmount.mul(depositTokenPrice) < core.minimumMagisterDepositAmount()) {
                    revert BaksDAOBelowMinimumMagisterDepositAmount();
                }

                magisters[magister].depositIds.push(id);
            }
            if (p.depositToken != IERC20(core.baks())) {
                IBank(core.bank()).onNewDeposit(p.depositToken, normalizedAmount);
            }
        } else {
            Deposit.Data storage d = deposits[currentDepositIds[poolId][msg.sender]];
            accrueRewards(d.id);

            uint256 r = d.depositorTotalAccruedRewards - d.depositorWithdrawnRewards;
            (uint256 depositorRewards, uint256 depositorBonusRewards, , ) = splitRewards(d.poolId, r, 0);
            IERC20(core.baks()).safeTransfer(d.depositor, depositorRewards);
            if (depositorBonusRewards > 0) {
                IERC20(core.voice()).safeTransfer(d.depositor, depositorBonusRewards);
            }

            d.principal += normalizedAmount;
            d.depositorWithdrawnRewards += r;
            d.lastDepositAt = block.timestamp;
            d.lastInteractionAt = block.timestamp;
        }
    }

    function getRewards(uint256 depositId) public view returns (uint256 depositorRewards, uint256 magisterRewards) {
        Deposit.Data memory d = deposits[depositId];

        (uint256 dr, uint256 mr) = calculateRewards(depositId);
        depositorRewards = dr + d.depositorTotalAccruedRewards - d.depositorWithdrawnRewards;
        magisterRewards = mr + d.magisterTotalAccruedRewards - d.magisterWithdrawnRewards;
    }

    function accrueRewards(uint256 depositId) internal {
        (uint256 depositorRewards, uint256 magisterRewards) = calculateRewards(depositId);

        Deposit.Data storage d = deposits[depositId];
        IERC20 depositToken = pools[d.poolId].depositToken;
        uint256 depositTokenPrice = depositToken == IERC20(core.baks())
            ? ONE
            : IPriceOracle(core.priceOracle()).getNormalizedPrice(depositToken);
        if (d.magister != address(this) && magisters[d.magister].isActive) {
            d.magisterTotalAccruedRewards += magisterRewards;
            magisters[d.magister].totalIncome += magisterRewards.mul(depositTokenPrice);
        }

        d.depositorTotalAccruedRewards += depositorRewards;
        if (magisters[msg.sender].isActive) {
            magisters[d.magister].totalIncome += depositorRewards.mul(depositTokenPrice);
        }
    }

    function calculateRewards(uint256 depositId)
        internal
        view
        returns (uint256 depositorRewards, uint256 magisterRewards)
    {
        Deposit.Data memory d = deposits[depositId];
        Pool.Data memory p = pools[d.poolId];

        uint256 totalRewards = d.principal.mul(
            p.calculateMultiplier(core.workFee(), block.timestamp - d.lastInteractionAt)
        );
        uint256 totalApr = p.getTotalApr();

        depositorRewards = totalRewards.mulDiv(p.getDepositorApr(), totalApr);
        magisterRewards = totalRewards.mulDiv(p.getMagisterApr(), totalApr);
    }

    function splitRewards(
        uint256 poolId,
        uint256 _depositorRewards,
        uint256 _magisterRewards
    )
        internal
        view
        returns (
            uint256 depositorRewards,
            uint256 depositorBonusRewards,
            uint256 magisterRewards,
            uint256 magisterBonusRewards
        )
    {
        IPriceOracle priceOracle = IPriceOracle(core.priceOracle());

        Pool.Data memory p = pools[poolId];

        uint256 depositorTotalApr = p.getDepositorApr();
        uint256 magisterTotalApr = p.getMagisterApr();
        uint256 depositTokenPrice = p.depositToken == IERC20(core.baks())
            ? ONE
            : priceOracle.getNormalizedPrice(p.depositToken);

        depositorRewards = _depositorRewards.mul(depositTokenPrice);
        magisterRewards = _magisterRewards.mul(depositTokenPrice);

        try priceOracle.getNormalizedPrice(IERC20(core.voice())) returns (uint256 bonusTokenPrice) {
            if (bonusTokenPrice > 0) {
                depositorBonusRewards = depositorRewards.mulDiv(
                    p.depositorBonusApr.mul(bonusTokenPrice),
                    depositorTotalApr
                );
                magisterBonusRewards = magisterRewards.mulDiv(
                    p.magisterBonusApr.mul(bonusTokenPrice),
                    magisterTotalApr
                );

                depositorRewards = depositorRewards.mulDiv(p.depositorApr, depositorTotalApr);
                magisterRewards = magisterRewards.mulDiv(p.magisterApr, magisterTotalApr);
            }
        } catch {}
    }
}
