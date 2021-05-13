import { randomBytes } from "crypto";
import { parseFixed } from "@ethersproject/bignumber";
import { BigNumber } from "ethers";
import { COL, DECIMALS } from "./constants";

export const e10 = (exponent: number): BigNumber =>
  BigNumber.from(10).pow(exponent);

export const usd = (amount: number): BigNumber =>
  parseFixed(amount.toString(), DECIMALS);

export const percent = (percent: number): BigNumber => usd(percent / 100);

export const col = (amount: number): BigNumber =>
  parseFixed(amount.toString(), COL.DECIMALS);

export const generateRandomAddress = (): string =>
  `0x${randomBytes(20).toString("hex")}`;
