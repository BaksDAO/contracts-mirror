/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DevelopmentFund,
  DevelopmentFundInterface,
} from "../DevelopmentFund";

const _abi = [
  {
    inputs: [],
    name: "BaksDAOOnlyDepositaryAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "ContractAlreadyInitialized",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610426806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063ddc1252611610050578063ddc12526146100c3578063e3056a34146100d6578063f2f4eb26146100e957600080fd5b80630c340a2414610077578063238efcbc146100a6578063c4d66de8146100b0575b600080fd5b60015461008a906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100ae6100fc565b005b6100ae6100be3660046103b7565b610175565b6100ae6100d13660046103db565b610274565b60025461008a906001600160a01b031681565b60005461008a906001600160a01b031681565b6002546001600160a01b031633146101275760405163aec80d4b60e01b815260040160405180910390fd5b600254600180546001600160a01b0319166001600160a01b03909216918217905560405181907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e90600090a3565b600054600160a01b900460ff161580156101aa57506000547501000000000000000000000000000000000000000000900460ff165b156101c857604051631ee1e30360e21b815260040160405180910390fd5b600054600160a01b900460ff1615801561021d57600080547fffffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffff1675010100000000000000000000000000000000000000001790555b600080546001600160a01b0319166001600160a01b03841617905561024133610353565b801561027057600080547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1690555b5050565b6001546001600160a01b0316331461029f576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b0382166102c65760405163604b48b960e11b815260040160405180910390fd5b6001600160a01b0382163014156102f0576040516306b3e95d60e21b815260040160405180910390fd5b600280546001600160a01b0319166001600160a01b0384161790558061034e576001546040516001600160a01b038085169216907fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb190600090a35050565b610270825b600180546001600160a01b0319166001600160a01b03831690811790915560405181907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e90600090a350565b6001600160a01b03811681146103b457600080fd5b50565b6000602082840312156103c957600080fd5b81356103d48161039f565b9392505050565b600080604083850312156103ee57600080fd5b82356103f98161039f565b91506020830135801515811461040e57600080fd5b80915050925092905056fea164736f6c634300080a000a";

type DevelopmentFundConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DevelopmentFundConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DevelopmentFund__factory extends ContractFactory {
  constructor(...args: DevelopmentFundConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DevelopmentFund> {
    return super.deploy(overrides || {}) as Promise<DevelopmentFund>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DevelopmentFund {
    return super.attach(address) as DevelopmentFund;
  }
  connect(signer: Signer): DevelopmentFund__factory {
    return super.connect(signer) as DevelopmentFund__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DevelopmentFundInterface {
    return new utils.Interface(_abi) as DevelopmentFundInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DevelopmentFund {
    return new Contract(address, _abi, signerOrProvider) as DevelopmentFund;
  }
}
