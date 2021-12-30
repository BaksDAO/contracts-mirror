/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ExchangeFundInterface extends utils.Interface {
  functions: {
    "acceptGovernance()": FunctionFragment;
    "core()": FunctionFragment;
    "deposit(address,uint256)": FunctionFragment;
    "depositableTokens(address)": FunctionFragment;
    "deposits(address,address)": FunctionFragment;
    "divest(address,uint256)": FunctionFragment;
    "getDepositableTokens()": FunctionFragment;
    "governor()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "invest(address,uint256)": FunctionFragment;
    "liquidity(address,address)": FunctionFragment;
    "listDepositableToken(address)": FunctionFragment;
    "pendingGovernor()": FunctionFragment;
    "quote(address,uint256)": FunctionFragment;
    "salvage(address)": FunctionFragment;
    "service(address)": FunctionFragment;
    "setSlippageTolerance(uint256)": FunctionFragment;
    "setSwapDeadline(uint256)": FunctionFragment;
    "slippageTolerance()": FunctionFragment;
    "swap(address,address,uint256,bool)": FunctionFragment;
    "swapDeadline()": FunctionFragment;
    "transferBaksToBank(uint256)": FunctionFragment;
    "transitGovernance(address,bool)": FunctionFragment;
    "unlistDepositableToken(address)": FunctionFragment;
    "withdraw(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "core", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositableTokens",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposits",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "divest",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositableTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "governor", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "invest",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidity",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "listDepositableToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingGovernor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "quote",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "salvage", values: [string]): string;
  encodeFunctionData(functionFragment: "service", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setSlippageTolerance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSwapDeadline",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "slippageTolerance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [string, string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "swapDeadline",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferBaksToBank",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transitGovernance",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "unlistDepositableToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "core", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositableTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "divest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDepositableTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "invest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "liquidity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "listDepositableToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingGovernor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "quote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "salvage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "service", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSlippageTolerance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSwapDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "slippageTolerance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferBaksToBank",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transitGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlistDepositableToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(address,address,uint256)": EventFragment;
    "DepositableTokenListed(address,address)": EventFragment;
    "DepositableTokenUnlisted(address)": EventFragment;
    "Divest(address,address,uint256)": EventFragment;
    "GovernanceTransited(address,address)": EventFragment;
    "Invest(address,address,uint256)": EventFragment;
    "PendingGovernanceTransition(address,address)": EventFragment;
    "Service(address,address)": EventFragment;
    "SlippageToleranceUpdated(uint256,uint256)": EventFragment;
    "Swap(address,address,address,uint256,uint256)": EventFragment;
    "SwapDeadlineUpdated(uint256,uint256)": EventFragment;
    "Withdrawal(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositableTokenListed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositableTokenUnlisted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Divest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GovernanceTransited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Invest"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "PendingGovernanceTransition"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Service"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SlippageToleranceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapDeadlineUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
}

export type DepositEvent = TypedEvent<
  [string, string, BigNumber],
  { account: string; token: string; amount: BigNumber }
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export type DepositableTokenListedEvent = TypedEvent<
  [string, string],
  { token: string; pair: string }
>;

export type DepositableTokenListedEventFilter =
  TypedEventFilter<DepositableTokenListedEvent>;

export type DepositableTokenUnlistedEvent = TypedEvent<
  [string],
  { token: string }
>;

export type DepositableTokenUnlistedEventFilter =
  TypedEventFilter<DepositableTokenUnlistedEvent>;

export type DivestEvent = TypedEvent<
  [string, string, BigNumber],
  { account: string; token: string; amount: BigNumber }
>;

export type DivestEventFilter = TypedEventFilter<DivestEvent>;

export type GovernanceTransitedEvent = TypedEvent<
  [string, string],
  { governor: string; newGovernor: string }
>;

export type GovernanceTransitedEventFilter =
  TypedEventFilter<GovernanceTransitedEvent>;

export type InvestEvent = TypedEvent<
  [string, string, BigNumber],
  { account: string; token: string; amount: BigNumber }
>;

export type InvestEventFilter = TypedEventFilter<InvestEvent>;

export type PendingGovernanceTransitionEvent = TypedEvent<
  [string, string],
  { governor: string; newGovernor: string }
>;

export type PendingGovernanceTransitionEventFilter =
  TypedEventFilter<PendingGovernanceTransitionEvent>;

export type ServiceEvent = TypedEvent<
  [string, string],
  { account: string; token: string }
>;

export type ServiceEventFilter = TypedEventFilter<ServiceEvent>;

export type SlippageToleranceUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { slippageTolerance: BigNumber; newSlippageTolerance: BigNumber }
>;

export type SlippageToleranceUpdatedEventFilter =
  TypedEventFilter<SlippageToleranceUpdatedEvent>;

export type SwapEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  {
    account: string;
    tokenA: string;
    tokenB: string;
    amountA: BigNumber;
    amountB: BigNumber;
  }
>;

export type SwapEventFilter = TypedEventFilter<SwapEvent>;

export type SwapDeadlineUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { swapDeadline: BigNumber; newSwapDeadline: BigNumber }
>;

export type SwapDeadlineUpdatedEventFilter =
  TypedEventFilter<SwapDeadlineUpdatedEvent>;

export type WithdrawalEvent = TypedEvent<
  [string, string, BigNumber],
  { account: string; token: string; amount: BigNumber }
>;

export type WithdrawalEventFilter = TypedEventFilter<WithdrawalEvent>;

export interface ExchangeFund extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExchangeFundInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    core(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositableTokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    deposits(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    divest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getDepositableTokens(
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    governor(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _core: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    invest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidity(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    listDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pendingGovernor(overrides?: CallOverrides): Promise<[string]>;

    quote(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { baksAmount: BigNumber }>;

    salvage(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    service(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSlippageTolerance(
      newSlippageTolerance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSwapDeadline(
      newSwapDeadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    slippageTolerance(overrides?: CallOverrides): Promise<[BigNumber]>;

    swap(
      tokenA: string,
      tokenB: string,
      amount: BigNumberish,
      useWrappedNativeCurrencyAsIntermediateToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapDeadline(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferBaksToBank(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transitGovernance(
      newGovernor: string,
      force: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unlistDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  core(overrides?: CallOverrides): Promise<string>;

  deposit(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositableTokens(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  deposits(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  divest(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getDepositableTokens(overrides?: CallOverrides): Promise<string[]>;

  governor(overrides?: CallOverrides): Promise<string>;

  initialize(
    _core: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  invest(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidity(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  listDepositableToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pendingGovernor(overrides?: CallOverrides): Promise<string>;

  quote(
    token: string,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  salvage(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  service(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSlippageTolerance(
    newSlippageTolerance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSwapDeadline(
    newSwapDeadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  slippageTolerance(overrides?: CallOverrides): Promise<BigNumber>;

  swap(
    tokenA: string,
    tokenB: string,
    amount: BigNumberish,
    useWrappedNativeCurrencyAsIntermediateToken: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapDeadline(overrides?: CallOverrides): Promise<BigNumber>;

  transferBaksToBank(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transitGovernance(
    newGovernor: string,
    force: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unlistDepositableToken(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptGovernance(overrides?: CallOverrides): Promise<void>;

    core(overrides?: CallOverrides): Promise<string>;

    deposit(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositableTokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deposits(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    divest(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getDepositableTokens(overrides?: CallOverrides): Promise<string[]>;

    governor(overrides?: CallOverrides): Promise<string>;

    initialize(_core: string, overrides?: CallOverrides): Promise<void>;

    invest(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    liquidity(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listDepositableToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    pendingGovernor(overrides?: CallOverrides): Promise<string>;

    quote(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    salvage(token: string, overrides?: CallOverrides): Promise<void>;

    service(token: string, overrides?: CallOverrides): Promise<void>;

    setSlippageTolerance(
      newSlippageTolerance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSwapDeadline(
      newSwapDeadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    slippageTolerance(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      tokenA: string,
      tokenB: string,
      amount: BigNumberish,
      useWrappedNativeCurrencyAsIntermediateToken: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    swapDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    transferBaksToBank(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transitGovernance(
      newGovernor: string,
      force: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    unlistDepositableToken(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(address,address,uint256)"(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): DepositEventFilter;
    Deposit(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): DepositEventFilter;

    "DepositableTokenListed(address,address)"(
      token?: string | null,
      pair?: null
    ): DepositableTokenListedEventFilter;
    DepositableTokenListed(
      token?: string | null,
      pair?: null
    ): DepositableTokenListedEventFilter;

    "DepositableTokenUnlisted(address)"(
      token?: string | null
    ): DepositableTokenUnlistedEventFilter;
    DepositableTokenUnlisted(
      token?: string | null
    ): DepositableTokenUnlistedEventFilter;

    "Divest(address,address,uint256)"(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): DivestEventFilter;
    Divest(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): DivestEventFilter;

    "GovernanceTransited(address,address)"(
      governor?: string | null,
      newGovernor?: string | null
    ): GovernanceTransitedEventFilter;
    GovernanceTransited(
      governor?: string | null,
      newGovernor?: string | null
    ): GovernanceTransitedEventFilter;

    "Invest(address,address,uint256)"(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): InvestEventFilter;
    Invest(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): InvestEventFilter;

    "PendingGovernanceTransition(address,address)"(
      governor?: string | null,
      newGovernor?: string | null
    ): PendingGovernanceTransitionEventFilter;
    PendingGovernanceTransition(
      governor?: string | null,
      newGovernor?: string | null
    ): PendingGovernanceTransitionEventFilter;

    "Service(address,address)"(
      account?: string | null,
      token?: string | null
    ): ServiceEventFilter;
    Service(account?: string | null, token?: string | null): ServiceEventFilter;

    "SlippageToleranceUpdated(uint256,uint256)"(
      slippageTolerance?: null,
      newSlippageTolerance?: null
    ): SlippageToleranceUpdatedEventFilter;
    SlippageToleranceUpdated(
      slippageTolerance?: null,
      newSlippageTolerance?: null
    ): SlippageToleranceUpdatedEventFilter;

    "Swap(address,address,address,uint256,uint256)"(
      account?: string | null,
      tokenA?: string | null,
      tokenB?: string | null,
      amountA?: null,
      amountB?: null
    ): SwapEventFilter;
    Swap(
      account?: string | null,
      tokenA?: string | null,
      tokenB?: string | null,
      amountA?: null,
      amountB?: null
    ): SwapEventFilter;

    "SwapDeadlineUpdated(uint256,uint256)"(
      swapDeadline?: null,
      newSwapDeadline?: null
    ): SwapDeadlineUpdatedEventFilter;
    SwapDeadlineUpdated(
      swapDeadline?: null,
      newSwapDeadline?: null
    ): SwapDeadlineUpdatedEventFilter;

    "Withdrawal(address,address,uint256)"(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): WithdrawalEventFilter;
    Withdrawal(
      account?: string | null,
      token?: string | null,
      amount?: null
    ): WithdrawalEventFilter;
  };

  estimateGas: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    core(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositableTokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposits(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    divest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getDepositableTokens(overrides?: CallOverrides): Promise<BigNumber>;

    governor(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _core: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    invest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidity(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pendingGovernor(overrides?: CallOverrides): Promise<BigNumber>;

    quote(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    salvage(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    service(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSlippageTolerance(
      newSlippageTolerance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSwapDeadline(
      newSwapDeadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    slippageTolerance(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      tokenA: string,
      tokenB: string,
      amount: BigNumberish,
      useWrappedNativeCurrencyAsIntermediateToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    transferBaksToBank(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transitGovernance(
      newGovernor: string,
      force: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unlistDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    core(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositableTokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    divest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getDepositableTokens(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _core: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    invest(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidity(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pendingGovernor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quote(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    salvage(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    service(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSlippageTolerance(
      newSlippageTolerance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSwapDeadline(
      newSwapDeadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    slippageTolerance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      tokenA: string,
      tokenB: string,
      amount: BigNumberish,
      useWrappedNativeCurrencyAsIntermediateToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapDeadline(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferBaksToBank(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transitGovernance(
      newGovernor: string,
      force: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unlistDepositableToken(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
