import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

const voiceMintingSchedule: Record<number, number> = {
  0: 50_000_000,
  5_000_000: 50_000_000,
  10_000_000: 100_000_000,
  20_000_000: 100_000_000,
  40_000_000: 100_000_000,
  80_000_000: 100_000_000,
  160_000_000: 100_000_000,
  320_000_000: 100_000_000,
  400_000_000: 100_000_000,
  480_000_000: 100_000_000,
  560_000_000: 100_000_000,
  640_000_000: 100_000_000,
  720_000_000: 100_000_000,
  800_000_000: 200_000_000,
  880_000_000: 200_000_000,
  960_000_000: 200_000_000,
  1_040_000_000: 200_000_000,
};

task("generate-voice-minting-schedule", "").setAction(async (_args, hre) => {
  console.debug(
    Object.entries(voiceMintingSchedule).map(([totalValueLocked, amount]) => {
      return hre.ethers.utils
        .parseEther(totalValueLocked.toString())
        .shl(128)
        .or(hre.ethers.utils.parseEther(amount.toString()))
        .toHexString();
    }),
  );
});
