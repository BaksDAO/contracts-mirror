import { expect } from "chai";
import { version as VERSION } from "../package.json";
import { COL, INITIAL_USER_COL_BALANCE } from "./shared/constants";
import { Environment, setupEnvironment } from "./shared/environment";

describe("Base Token", () => {
  let env: Environment;

  beforeEach(async () => {
    env = await setupEnvironment();
  });

  it("have correct minter address", async () => {
    expect(await env.collateralToken.minter()).to.equal(env.minter.address);
  });

  describe("metadata", () => {
    it("returns the correct name", async () => {
      const name = await env.collateralToken.name();
      expect(name).to.equal(COL.NAME);
    });

    it("returns the correct symbol", async () => {
      const symbol = await env.collateralToken.symbol();
      expect(symbol).to.equal(COL.SYMBOL);
    });

    it("returns the correct number of decimals", async () => {
      const decimals = await env.collateralToken.decimals();
      expect(decimals).to.equal(COL.DECIMALS);
    });

    it("returns the correct version", async () => {
      const version = await env.collateralToken.version();
      expect(version).to.equal(VERSION);
    });
  });

  describe("total supply", () => {
    it("returns the total supply of tokens", async () => {
      const totalSupply = await env.collateralToken.totalSupply();
      expect(totalSupply).to.equal(INITIAL_USER_COL_BALANCE);
    });
  });
});
