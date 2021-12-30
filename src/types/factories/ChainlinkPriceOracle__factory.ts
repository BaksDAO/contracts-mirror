/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ChainlinkPriceOracle,
  ChainlinkPriceOracleInterface,
} from "../ChainlinkPriceOracle";

const _abi = [
  {
    inputs: [],
    name: "BaksDAOOnlyDepositaryAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "BaksDAOOnlySuperUserAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "ContractAlreadyInitialized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "prod1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
    ],
    name: "FixedPointMathMulDivOverflow",
    type: "error",
  },
  {
    inputs: [],
    name: "GovernedCantGoverItself",
    type: "error",
  },
  {
    inputs: [],
    name: "GovernedGovernorZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "GovernedOnlyGovernorAllowedToCall",
    type: "error",
  },
  {
    inputs: [],
    name: "GovernedOnlyPendingGovernorAllowedToCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "int256",
        name: "price",
        type: "int256",
      },
    ],
    name: "PriceOracleInvalidPrice",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceOracleStalePrice",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "PriceOracleTokenUnknown",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IChainlinkAggregator",
        name: "aggregator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isQuoteNative",
        type: "bool",
      },
    ],
    name: "AggregatorSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "governor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newGovernor",
        type: "address",
      },
    ],
    name: "GovernanceTransited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "governor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newGovernor",
        type: "address",
      },
    ],
    name: "PendingGovernanceTransition",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "core",
    outputs: [
      {
        internalType: "contract ICore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "getNormalizedPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "normalizedPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ICore",
        name: "_core",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    name: "nativeAggregators",
    outputs: [
      {
        internalType: "contract IChainlinkAggregator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingGovernor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "contract IChainlinkAggregator",
        name: "aggregator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isQuoteNative",
        type: "bool",
      },
    ],
    name: "setAggregator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newGovernor",
        type: "address",
      },
      {
        internalType: "bool",
        name: "force",
        type: "bool",
      },
    ],
    name: "transitGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    name: "usdAggregators",
    outputs: [
      {
        internalType: "contract IChainlinkAggregator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ac2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c8063a534acb811610076578063ddc125261161005b578063ddc1252614610196578063e3056a34146101a9578063f2f4eb26146101bc57600080fd5b8063a534acb81461015a578063c4d66de81461018357600080fd5b8063238efcbc116100a7578063238efcbc146101145780637f2141c81461011e578063a3e832921461013157600080fd5b80630c340a24146100c35780631e1f1264146100f3575b600080fd5b6001546100d6906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b610106610101366004610953565b6101cf565b6040519081526020016100ea565b61011c6102e1565b005b61011c61012c366004610985565b61035a565b6100d661013f366004610953565b6003602052600090815260409020546001600160a01b031681565b6100d6610168366004610953565b6004602052600090815260409020546001600160a01b031681565b61011c610191366004610953565b61043d565b61011c6101a43660046109cc565b61053c565b6002546100d6906001600160a01b031681565b6000546100d6906001600160a01b031681565b60008060009054906101000a90046001600160a01b03166001600160a01b0316634c4e61e96040518163ffffffff1660e01b8152600401602060405180830381865afa158015610223573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102479190610a01565b6001600160a01b0316826001600160a01b0316141561026f5750670de0b6b3a7640000919050565b6001600160a01b0380831660009081526004602052604090205416806102c057600061029a8461061f565b905060006102a6610674565b90506102b782826305f5e10061073a565b95945050505050565b6402540be4006102d084836107f5565b6102da9190610a1e565b9392505050565b6002546001600160a01b0316331461030c5760405163aec80d4b60e01b815260040160405180910390fd5b600254600180546001600160a01b0319166001600160a01b03909216918217905560405181907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e90600090a3565b6001546001600160a01b03163314610385576040516305e7700560e51b815260040160405180910390fd5b80156103be576001600160a01b03838116600090815260036020526040902080546001600160a01b0319169184169190911790556103ed565b6001600160a01b03838116600090815260046020526040902080546001600160a01b0319169184169190911790555b604080516001600160a01b038581168252841660208201528215158183015290517f63fd82896bab8eef1a35d3ab2266a9c3153779e4e3294e42cb7083100a8360759181900360600190a1505050565b600254600160a01b900460ff1615801561047257506002547501000000000000000000000000000000000000000000900460ff165b1561049057604051631ee1e30360e21b815260040160405180910390fd5b600254600160a01b900460ff161580156104e557600280547fffffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffff1675010100000000000000000000000000000000000000001790555b600080546001600160a01b0319166001600160a01b038416179055610509336108ef565b801561053857600280547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1690555b5050565b6001546001600160a01b03163314610567576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b03821661058e5760405163604b48b960e11b815260040160405180910390fd5b6001600160a01b0382163014156105b8576040516306b3e95d60e21b815260040160405180910390fd5b600280546001600160a01b0319166001600160a01b03841617905580610616576001546040516001600160a01b038085169216907fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb190600090a35050565b610538826108ef565b6001600160a01b038082166000908152600360205260408120549091168061066a57604051637b32290760e01b81526001600160a01b03841660048201526024015b60405180910390fd5b6102da83826107f5565b60008054604080516339fcc0a360e21b8152905183926001600160a01b03169163e7f3028c9160048083019260209291908290030181865afa1580156106be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e29190610a01565b6001600160a01b03808216600090815260046020526040902054919250168061072957604051637b32290760e01b81526001600160a01b0383166004820152602401610661565b61073382826107f5565b9250505090565b6000808060001985870985870292508281108382030391505083811061077d5760405163072fa3c960e31b81526004810182905260248101859052604401610661565b8061078d575082900490506102da565b600084868809600260036001881981018916988990049182028318808302840302808302840302808302840302808302840302808302840302918202909203026000889003889004909101858311909403939093029303949094049190911702949350505050565b600080600080846001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610839573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085d9190610a65565b94505050925092506000821361089857604051631919cdd560e31b81526001600160a01b038716600482015260248101839052604401610661565b8193508269ffffffffffffffffffff168169ffffffffffffffffffff1610156108e657604051638a7611fb60e01b81526001600160a01b038716600482015260248101859052604401610661565b50505092915050565b600180546001600160a01b0319166001600160a01b03831690811790915560405181907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e90600090a350565b6001600160a01b038116811461095057600080fd5b50565b60006020828403121561096557600080fd5b81356102da8161093b565b8035801515811461098057600080fd5b919050565b60008060006060848603121561099a57600080fd5b83356109a58161093b565b925060208401356109b58161093b565b91506109c360408501610970565b90509250925092565b600080604083850312156109df57600080fd5b82356109ea8161093b565b91506109f860208401610970565b90509250929050565b600060208284031215610a1357600080fd5b81516102da8161093b565b6000816000190483118215151615610a4657634e487b7160e01b600052601160045260246000fd5b500290565b805169ffffffffffffffffffff8116811461098057600080fd5b600080600080600060a08688031215610a7d57600080fd5b610a8686610a4b565b9450602086015193506040860151925060608601519150610aa960808701610a4b565b9050929550929590935056fea164736f6c634300080a000a";

type ChainlinkPriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChainlinkPriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChainlinkPriceOracle__factory extends ContractFactory {
  constructor(...args: ChainlinkPriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ChainlinkPriceOracle> {
    return super.deploy(overrides || {}) as Promise<ChainlinkPriceOracle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ChainlinkPriceOracle {
    return super.attach(address) as ChainlinkPriceOracle;
  }
  connect(signer: Signer): ChainlinkPriceOracle__factory {
    return super.connect(signer) as ChainlinkPriceOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChainlinkPriceOracleInterface {
    return new utils.Interface(_abi) as ChainlinkPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainlinkPriceOracle {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ChainlinkPriceOracle;
  }
}
