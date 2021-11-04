// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.9;

import {Initializable} from "./libraries/Upgradability.sol";
import {Governed} from "./Governance.sol";

contract DevelopmentFund is Initializable, Governed {
    function initialize() external initializer {
        setGovernor(msg.sender);
    }
}
