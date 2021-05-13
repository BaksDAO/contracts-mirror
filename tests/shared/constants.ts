import { usd, col, percent } from "./helpers";

export const DECIMALS = 18;

export const DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO = percent(65);

export const DEFAULT_STABILITY_FEE = percent(3);

export const COL = { NAME: "Collateral Token", SYMBOL: "COL", DECIMALS: 8 };

export const INITIAL_USER_COL_BALANCE = col(8.71);

export const INITIAL_COL_PRICE = usd(180.45);

export const LOAN_ID = 0;

export const LOAN_PRINICPAL_AMOUNT = usd(100);
