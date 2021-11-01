/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface ChainlinkPriceOracleInterface extends ethers.utils.Interface {
  functions: {
    "acceptGovernance()": FunctionFragment;
    "getNormalizedPrice(address)": FunctionFragment;
    "governor()": FunctionFragment;
    "nativeAggregators(address)": FunctionFragment;
    "pendingGovernor()": FunctionFragment;
    "setAggregator(address,address,bool)": FunctionFragment;
    "transitGovernance(address)": FunctionFragment;
    "usdAggregators(address)": FunctionFragment;
    "wrappedNativeCurrency()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNormalizedPrice",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "governor", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nativeAggregators",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingGovernor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAggregator",
    values: [string, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transitGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "usdAggregators",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "wrappedNativeCurrency",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNormalizedPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nativeAggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingGovernor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAggregator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transitGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usdAggregators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wrappedNativeCurrency",
    data: BytesLike
  ): Result;

  events: {
    "AggregatorSet(address,address,bool)": EventFragment;
    "GovernanceTransited(address,address)": EventFragment;
    "PendingGovernanceTransition(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AggregatorSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GovernanceTransited"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "PendingGovernanceTransition"
  ): EventFragment;
}

export type AggregatorSetEvent = TypedEvent<
  [string, string, boolean],
  { token: string; aggregator: string; isQuoteNative: boolean }
>;

export type AggregatorSetEventFilter = TypedEventFilter<AggregatorSetEvent>;

export type GovernanceTransitedEvent = TypedEvent<
  [string, string],
  { governor: string; newGovernor: string }
>;

export type GovernanceTransitedEventFilter =
  TypedEventFilter<GovernanceTransitedEvent>;

export type PendingGovernanceTransitionEvent = TypedEvent<
  [string, string],
  { governor: string; newGovernor: string }
>;

export type PendingGovernanceTransitionEventFilter =
  TypedEventFilter<PendingGovernanceTransitionEvent>;

export interface ChainlinkPriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChainlinkPriceOracleInterface;

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

    getNormalizedPrice(
      token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { normalizedPrice: BigNumber }>;

    governor(overrides?: CallOverrides): Promise<[string]>;

    nativeAggregators(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    pendingGovernor(overrides?: CallOverrides): Promise<[string]>;

    setAggregator(
      token: string,
      aggregator: string,
      isQuoteNative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transitGovernance(
      newGovernor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    usdAggregators(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    wrappedNativeCurrency(overrides?: CallOverrides): Promise<[string]>;
  };

  acceptGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getNormalizedPrice(
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  governor(overrides?: CallOverrides): Promise<string>;

  nativeAggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

  pendingGovernor(overrides?: CallOverrides): Promise<string>;

  setAggregator(
    token: string,
    aggregator: string,
    isQuoteNative: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transitGovernance(
    newGovernor: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  usdAggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

  wrappedNativeCurrency(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptGovernance(overrides?: CallOverrides): Promise<void>;

    getNormalizedPrice(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governor(overrides?: CallOverrides): Promise<string>;

    nativeAggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

    pendingGovernor(overrides?: CallOverrides): Promise<string>;

    setAggregator(
      token: string,
      aggregator: string,
      isQuoteNative: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    transitGovernance(
      newGovernor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    usdAggregators(arg0: string, overrides?: CallOverrides): Promise<string>;

    wrappedNativeCurrency(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AggregatorSet(address,address,bool)"(
      token?: null,
      aggregator?: null,
      isQuoteNative?: null
    ): AggregatorSetEventFilter;
    AggregatorSet(
      token?: null,
      aggregator?: null,
      isQuoteNative?: null
    ): AggregatorSetEventFilter;

    "GovernanceTransited(address,address)"(
      governor?: string | null,
      newGovernor?: string | null
    ): GovernanceTransitedEventFilter;
    GovernanceTransited(
      governor?: string | null,
      newGovernor?: string | null
    ): GovernanceTransitedEventFilter;

    "PendingGovernanceTransition(address,address)"(
      governor?: string | null,
      newGovernor?: string | null
    ): PendingGovernanceTransitionEventFilter;
    PendingGovernanceTransition(
      governor?: string | null,
      newGovernor?: string | null
    ): PendingGovernanceTransitionEventFilter;
  };

  estimateGas: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getNormalizedPrice(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governor(overrides?: CallOverrides): Promise<BigNumber>;

    nativeAggregators(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingGovernor(overrides?: CallOverrides): Promise<BigNumber>;

    setAggregator(
      token: string,
      aggregator: string,
      isQuoteNative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transitGovernance(
      newGovernor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    usdAggregators(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    wrappedNativeCurrency(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getNormalizedPrice(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nativeAggregators(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingGovernor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAggregator(
      token: string,
      aggregator: string,
      isQuoteNative: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transitGovernance(
      newGovernor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    usdAggregators(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wrappedNativeCurrency(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}