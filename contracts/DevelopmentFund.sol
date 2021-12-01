// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.10;

import {Governed} from "./Governance.sol";
import {Initializable} from "./libraries/Upgradability.sol";
import {CoreInside, ICore} from "./Core.sol";

contract DevelopmentFund is CoreInside, Initializable, Governed {
    function initialize(ICore _core) external initializer {
        initializeCoreInside(_core);
        setGovernor(msg.sender);
    }
}
