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
        internalType: "contract IERC20",
        name: "_wrappedNativeCurrency",
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
  {
    inputs: [],
    name: "wrappedNativeCurrency",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610996806100206000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c8063a534acb811610076578063ddc125261161005b578063ddc125261461019c578063e3056a34146101af578063e7f3028c146101c257600080fd5b8063a534acb814610160578063c4d66de81461018957600080fd5b8063238efcbc116100a7578063238efcbc1461011a5780637f2141c814610124578063a3e832921461013757600080fd5b80630c340a24146100c35780631e1f1264146100f9575b600080fd5b6000546100dc906201000090046001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61010c610107366004610844565b6101d5565b6040519081526020016100f0565b610122610249565b005b610122610132366004610876565b6102de565b6100dc610145366004610844565b6003602052600090815260409020546001600160a01b031681565b6100dc61016e366004610844565b6004602052600090815260409020546001600160a01b031681565b610122610197366004610844565b6103c7565b6101226101aa3660046108bd565b610455565b6001546100dc906001600160a01b031681565b6002546100dc906001600160a01b031681565b6001600160a01b038082166000908152600460205260408120549091168061022857600061020284610543565b9050600061020e610598565b905061021f82826305f5e100610601565b95945050505050565b6402540be40061023884836106bc565b61024291906108f2565b9392505050565b6001546001600160a01b031633146102745760405163aec80d4b60e01b815260040160405180910390fd5b60015460008054620100006001600160a01b0393841681810275ffffffffffffffffffffffffffffffffffffffff00001990931692909217808455604051929491900416917f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e91a3565b6000546201000090046001600160a01b0316331461030f576040516305e7700560e51b815260040160405180910390fd5b8015610348576001600160a01b03838116600090815260036020526040902080546001600160a01b031916918416919091179055610377565b6001600160a01b03838116600090815260046020526040902080546001600160a01b0319169184169190911790555b604080516001600160a01b038581168252841660208201528215158183015290517f63fd82896bab8eef1a35d3ab2266a9c3153779e4e3294e42cb7083100a8360759181900360600190a1505050565b60005460ff161580156103e15750600054610100900460ff165b156103ff57604051631ee1e30360e21b815260040160405180910390fd5b60005460ff1615801561041c576000805461ffff19166101011790555b610425336107c5565b600280546001600160a01b0319166001600160a01b0384161790558015610451576000805460ff191690555b5050565b6000546201000090046001600160a01b03163314610486576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b0382166104ad5760405163604b48b960e11b815260040160405180910390fd5b6001600160a01b0382163014156104d7576040516306b3e95d60e21b815260040160405180910390fd5b600180546001600160a01b0319166001600160a01b0384161790558061053a57600080546040516001600160a01b03808616936201000090930416917fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb191a35050565b610451826107c5565b6001600160a01b038082166000908152600360205260408120549091168061058e57604051637b32290760e01b81526001600160a01b03841660048201526024015b60405180910390fd5b61024283826106bc565b6002546001600160a01b03908116600090815260046020526040812054909116806105e557600254604051637b32290760e01b81526001600160a01b039091166004820152602401610585565b6002546105fb906001600160a01b0316826106bc565b91505090565b600080806000198587098587029250828110838203039150508381106106445760405163072fa3c960e31b81526004810182905260248101859052604401610585565b8061065457508290049050610242565b600084868809600260036001881981018916988990049182028318808302840302808302840302808302840302808302840302808302840302918202909203026000889003889004909101858311909403939093029303949094049190911702949350505050565b600080600080846001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156106fb57600080fd5b505afa15801561070f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107339190610939565b94505050925092506000821361076e57604051631919cdd560e31b81526001600160a01b038716600482015260248101839052604401610585565b8193508269ffffffffffffffffffff168169ffffffffffffffffffff1610156107bc57604051638a7611fb60e01b81526001600160a01b038716600482015260248101859052604401610585565b50505092915050565b6000805475ffffffffffffffffffffffffffffffffffffffff00001916620100006001600160a01b0384811682810293909317808555604051939492900416917f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e9190a350565b6001600160a01b038116811461084157600080fd5b50565b60006020828403121561085657600080fd5b81356102428161082c565b8035801515811461087157600080fd5b919050565b60008060006060848603121561088b57600080fd5b83356108968161082c565b925060208401356108a68161082c565b91506108b460408501610861565b90509250925092565b600080604083850312156108d057600080fd5b82356108db8161082c565b91506108e960208401610861565b90509250929050565b600081600019048311821515161561091a57634e487b7160e01b600052601160045260246000fd5b500290565b805169ffffffffffffffffffff8116811461087157600080fd5b600080600080600060a0868803121561095157600080fd5b61095a8661091f565b945060208601519350604086015192506060860151915061097d6080870161091f565b9050929550929590935056fea164736f6c6343000809000a";

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
