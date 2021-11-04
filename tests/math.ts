import { TestMath } from "!types/TestMath";
import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { deployments, ethers } from "hardhat";
import { Environment, setupEnvironment } from "./shared/environment";

describe("Math", () => {
  let env: Environment;
  let math: TestMath;

  beforeEach(async () => {
    env = await setupEnvironment();

    const { deploy } = deployments;
    await deploy("TestMath", {
      from: env.governor.address,
    });

    math = await ethers.getContract<TestMath>("TestMath");
  });

  it("sqrt", async () => {
    expect(await math._sqrt(100)).to.equal(10);
    expect(await math._sqrt(169)).to.equal(13);
    expect(await math._sqrt(168)).to.equal(12);
    expect(await math._sqrt(144)).to.equal(12);
  });

  it("fpsqrt", async () => {
    let fp: BigNumber = parseEther("0.36");
    expect(await math._fpsqrt(fp)).to.equal(parseEther("0.6"));

    fp = parseEther("14937.7284");
    expect(await math._fpsqrt(fp)).to.equal(parseEther("122.22"));

    fp = parseEther("144");
    expect(await math._fpsqrt(fp)).to.equal(parseEther("12"));

    expect(await math._fpsqrt(0)).to.equal(0);
    expect(await math._fpsqrt(ethers.constants.MaxUint256)).to.equal(
      BigNumber.from("340282366920938463463374607431768211455").mul(1e9),
    );
  });

  it("abs", async () => {
    expect(await math._abs(-12)).to.equal(12);
    expect(await math._abs(-1)).to.equal(1);
    expect(await math._abs(0)).to.equal(0);
    expect(await math._abs(24)).to.equal(24);
  });
});
