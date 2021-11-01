/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Baks, BaksInterface } from "../Baks";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ApproveFromZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ApproveToZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "BurnAmountExceedsBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BurnFromZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "EIP2612InvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "EIP2612PermissionExpired",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MinterZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyMinterAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
    ],
    name: "TransferAmountExceedsAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "TransferAmountExceedsBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferFromZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
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
        name: "minter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
    ],
    name: "MinterChanged",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    ],
    name: "transitGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b5060405162001355380380620013558339810160408190526200003491620002db565b60408051808201825260048082526342616b7360e01b602080840191909152835180850185529182526342414b5360e01b828201528351808501855260018152603160f81b91810191909152600080546001600160a01b031916339081178255945193949293601293879290917fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb1908290a3600080546040516001600160a01b0390911691907f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e908290a36001600160a01b0381166200012757604051638cc5de0560e01b815260040160405180910390fd5b600980546001600160a01b0319166001600160a01b03831617905584516200015790600290602088019062000235565b5083516200016d90600390602087019062000235565b506004805460ff191660ff851617905581516200019290600590602085019062000235565b507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6002604051620001c591906200034a565b60405180910390206005604051620001de91906200034a565b60408051918290038220602083019490945281019190915260608101919091524660808201523060a082015260c00160408051601f19818403018152919052805160209091012060805250620003ee945050505050565b82805462000243906200030d565b90600052602060002090601f016020900481019282620002675760008555620002b2565b82601f106200028257805160ff1916838001178555620002b2565b82800160010185558215620002b2579182015b82811115620002b257825182559160200191906001019062000295565b50620002c0929150620002c4565b5090565b5b80821115620002c05760008155600101620002c5565b600060208284031215620002ee57600080fd5b81516001600160a01b03811681146200030657600080fd5b9392505050565b600181811c908216806200032257607f821691505b602082108114156200034457634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806200036757607f831692505b60208084108214156200038857634e487b7160e01b86526022600452602486fd5b8180156200039f5760018114620003b157620003e0565b60ff19861689528489019650620003e0565b60008a81526020902060005b86811015620003d85781548b820152908501908301620003bd565b505084890196505b509498975050505050505050565b608051610f44620004116000396000818161025301526106df0152610f446000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c806354fd4d50116100d85780639dc29fac1161008c578063dd62ed3e11610066578063dd62ed3e14610324578063e3056a341461034f578063fca3b5aa1461036257600080fd5b80639dc29fac146102eb578063a9059cbb146102fe578063d505accf1461031157600080fd5b806370a08231116100bd57806370a08231146102a35780637ecebe00146102c357806395d89b41146102e357600080fd5b806354fd4d5014610288578063631aa9e21461029057600080fd5b8063238efcbc1161012f578063313ce56711610114578063313ce5671461022f5780633644e5151461024e57806340c10f191461027557600080fd5b8063238efcbc1461021257806323b872dd1461021c57600080fd5b8063095ea7b311610160578063095ea7b3146101c55780630c340a24146101e857806318160ddd146101fb57600080fd5b806306fdde031461017c578063075461721461019a575b600080fd5b610184610375565b6040516101919190610cfd565b60405180910390f35b6009546101ad906001600160a01b031681565b6040516001600160a01b039091168152602001610191565b6101d86101d3366004610d6e565b610403565b6040519015158152602001610191565b6000546101ad906001600160a01b031681565b61020460065481565b604051908152602001610191565b61021a610419565b005b6101d861022a366004610d98565b61049c565b60045461023c9060ff1681565b60405160ff9091168152602001610191565b6102047f000000000000000000000000000000000000000000000000000000000000000081565b61021a610283366004610d6e565b610530565b610184610569565b61021a61029e366004610dd4565b610576565b6102046102b1366004610dd4565b60076020526000908152604090205481565b6102046102d1366004610dd4565b600a6020526000908152604090205481565b610184610650565b61021a6102f9366004610d6e565b61065d565b6101d861030c366004610d6e565b610692565b61021a61031f366004610df6565b61069f565b610204610332366004610e69565b600860209081526000928352604080842090915290825290205481565b6001546101ad906001600160a01b031681565b61021a610370366004610dd4565b61087c565b6002805461038290610e9c565b80601f01602080910402602001604051908101604052809291908181526020018280546103ae90610e9c565b80156103fb5780601f106103d0576101008083540402835291602001916103fb565b820191906000526020600020905b8154815290600101906020018083116103de57829003601f168201915b505050505081565b6000610410338484610927565b50600192915050565b6001546001600160a01b031633146104445760405163aec80d4b60e01b815260040160405180910390fd5b6001546000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216918217815560405182917f564590b81987d147246f63910a8e1ee4eb09c4d64cc75ee975a8ffedfcc2210e91a3565b60006001600160a01b038416331461051b576001600160a01b0384166000908152600860209081526040808320338452909152902054828110156105195760405163be2e2e2160e01b81526001600160a01b0380871660048301528516602482015260448101849052606481018290526084015b60405180910390fd5b505b6105268484846109fb565b5060019392505050565b6009546001600160a01b0316331461055b5760405163404a0f8760e11b815260040160405180910390fd5b6105658282610b59565b5050565b6005805461038290610e9c565b6000546001600160a01b031633146105a1576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b0381166105c85760405163604b48b960e11b815260040160405180910390fd5b6001600160a01b0381163014156105f2576040516306b3e95d60e21b815260040160405180910390fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383811691821790925560008054604051929316917fc606c9af1451cadeb333f6ff7b24a5540974f4e800bac274fa7fff9edc305cb19190a350565b6003805461038290610e9c565b6009546001600160a01b031633146106885760405163404a0f8760e11b815260040160405180910390fd5b6105658282610c0e565b60006104103384846109fb565b428410156106c35760405163282fb55560e21b815260048101859052602401610510565b6001600160a01b0387166000908152600a6020526040812080547f0000000000000000000000000000000000000000000000000000000000000000917ffc77c2b9d30fe91687fd39abb7d16fcdfe1472d065740051ab8b13e4bf4a617f918b918b918b918761073183610eed565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016107aa92919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610815573d6000803e3d6000fd5b505050602060405103519050886001600160a01b0316816001600160a01b0316146108665760405163a94a4aad60e01b81526001600160a01b03808b16600483015282166024820152604401610510565b610871898989610927565b505050505050505050565b6000546001600160a01b031633146108a7576040516305e7700560e51b815260040160405180910390fd5b6001600160a01b0381166108ce57604051638cc5de0560e01b815260040160405180910390fd5b6009805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03831690811790915560405181907f3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f690600090a350565b6001600160a01b0383166109605760405163da64efb160e01b81526001600160a01b038316600482015260248101829052604401610510565b6001600160a01b0382166109995760405163c97cb7a160e01b81526001600160a01b038416600482015260248101829052604401610510565b6001600160a01b0383811660008181526008602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316610a345760405163cd09812f60e01b81526001600160a01b038316600482015260248101829052604401610510565b6001600160a01b038216610a6d57604051636eb47bab60e11b81526001600160a01b038416600482015260248101829052604401610510565b6001600160a01b03831660009081526007602052604090205481811015610ac857604051630c38c5f960e41b81526001600160a01b038086166004830152841660248201526044810183905260648101829052608401610510565b6001600160a01b03808516600090815260076020526040808220858503905591851681529081208054849290610aff908490610f08565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b4b91815260200190565b60405180910390a350505050565b6001600160a01b038216610b835760405163070bae6960e51b815260048101829052602401610510565b6001600160a01b03821660009081526007602052604081208054839290610bab908490610f08565b925050819055508060066000828254610bc49190610f08565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610c385760405163131259b960e21b815260048101829052602401610510565b6001600160a01b03821660009081526007602052604090205481811015610c8b57604051630246530960e61b81526001600160a01b03841660048201526024810183905260448101829052606401610510565b6001600160a01b0383166000908152600760205260408120838303905560068054849290610cba908490610f20565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016109ee565b600060208083528351808285015260005b81811015610d2a57858101830151858201604001528201610d0e565b81811115610d3c576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610d6957600080fd5b919050565b60008060408385031215610d8157600080fd5b610d8a83610d52565b946020939093013593505050565b600080600060608486031215610dad57600080fd5b610db684610d52565b9250610dc460208501610d52565b9150604084013590509250925092565b600060208284031215610de657600080fd5b610def82610d52565b9392505050565b600080600080600080600060e0888a031215610e1157600080fd5b610e1a88610d52565b9650610e2860208901610d52565b95506040880135945060608801359350608088013560ff81168114610e4c57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610e7c57600080fd5b610e8583610d52565b9150610e9360208401610d52565b90509250929050565b600181811c90821680610eb057607f821691505b60208210811415610ed157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000600019821415610f0157610f01610ed7565b5060010190565b60008219821115610f1b57610f1b610ed7565b500190565b600082821015610f3257610f32610ed7565b50039056fea164736f6c6343000809000a";

type BaksConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaksConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Baks__factory extends ContractFactory {
  constructor(...args: BaksConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Baks> {
    return super.deploy(minter, overrides || {}) as Promise<Baks>;
  }
  getDeployTransaction(
    minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(minter, overrides || {});
  }
  attach(address: string): Baks {
    return super.attach(address) as Baks;
  }
  connect(signer: Signer): Baks__factory {
    return super.connect(signer) as Baks__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaksInterface {
    return new utils.Interface(_abi) as BaksInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Baks {
    return new Contract(address, _abi, signerOrProvider) as Baks;
  }
}
