import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

const beneficiaries: Record<string, number> = {
  "0x21309DA9AD64eA82431758B27cbD63E5d53A556c": 1,
  "0x8AeDd719344D62b154C358278a6F29a9E1F22579": 1,
};

task("generate-beneficiaries-list", "").setAction(async (_args, hre) => {
  console.debug(
    Object.entries(beneficiaries).map(([address, share]) => {
      return address.toLowerCase() + share.toString(16).padStart(24, "0");
    }),
  );
});
