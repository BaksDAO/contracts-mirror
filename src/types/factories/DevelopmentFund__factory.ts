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
    ],
    name: "transitGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163390811782556040519091907fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb1908290a3600080546040516001600160a01b0390911691907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e908290a361024a806100986000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630c340a2414610051578063238efcbc14610080578063631aa9e21461008a578063e3056a341461009d575b600080fd5b600054610064906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100886100b0565b005b61008861009836600461020d565b610133565b600154610064906001600160a01b031681565b6001546001600160a01b031633146100db5760405163aec80d4b60e01b815260040160405180910390fd5b6001546000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216918217815560405182917f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e91a3565b6000546001600160a01b0316331461015e576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b0381166101855760405163604b48b960e11b815260040160405180910390fd5b6001600160a01b0381163014156101af576040516306b3e95d60e21b815260040160405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383811691821790925560008054604051929316917fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb19190a350565b60006020828403121561021f57600080fd5b81356001600160a01b038116811461023657600080fd5b939250505056fea164736f6c6343000809000a";

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
