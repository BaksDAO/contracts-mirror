import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import chalk from "chalk";
import dotenv from "dotenv";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-packager";
import { HardhatUserConfig } from "hardhat/config";
import isCI from "is-ci";
import "solidity-coverage";
import "./tasks";

dotenv.config();
const {
  COIN_MARKET_CAP_API_KEY = "d25b5576-a4ee-41be-bb2b-aca2ba3ae5d8",
  ETHERSCAN_API_KEY,
  INFURA_PROJECT_ID = "84842078b09946638c03157f83405213",
  MNEMONIC = "overn merry manual oil detail fit pair boat possible pitch icon donkey",
  REPORT_GAS = "false",
  SOLIDITY_VERSION = "0.8.9",
} = process.env;

if (!MNEMONIC) {
  console.error(
    chalk`{red ✖} Please set your {italic MNEMONIC} in environment variable or {bold .env} file`,
  );
  process.exit(1);
}
const accounts = {
  count: 10,
  mnemonic: MNEMONIC,
};

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    currency: "USD",
    enabled: REPORT_GAS === "true" ? true : false,
    src: "./contracts/",
  },
  solidity: {
    version: SOLIDITY_VERSION,
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    hardhat: {
      accounts,
      tags: ["local", "test"],
    },
    eth: {
      url: "https://cloudflare-eth.com",
      chainId: 1,
      accounts,
      tags: ["mainnet", "production"],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 3,
      accounts,
      tags: ["staging", "testnet"],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 4,
      accounts,
      tags: ["staging", "testnet"],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 5,
      accounts,
      tags: ["staging", "testnet"],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 42,
      accounts,
      tags: ["staging", "testnet"],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts,
      tags: ["mainnet", "production"],
    },
    "bsc-test": {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts,
      tags: ["staging", "testnet"],
    },
    matic: {
      url: "https://rpc-mainnet.matic.network",
      chainId: 137,
      accounts,
      tags: ["mainnet", "production"],
    },
    "matic-test": {
      url: "https://rpc-mumbai.matic.today",
      chainId: 80001,
      accounts,
      tags: ["staging", "testnet"],
    },
  },
  paths: {
    tests: "./tests/",
  },
  mocha: {
    reporter: isCI ? "mocha-junit-reporter" : "spec",
    reporterOptions: {
      jenkinsMode: true,
    },
  },
  typechain: {
    target: "ethers-v5",
    outDir: "./src/types/",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    minter: {
      default: 1,
    },
    user: {
      default: 2,
    },
    operator: {
      default: 3,
    },
    liquidator: {
      default: 4,
    },
    uniswapV2Router: {
      default: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      rinkeby: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      bsc: "0x10ed43c718714eb63d5aa57b78b54704e256024e",
      // "bsc-test": "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
      "bsc-test": "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      "bsc-test-2": "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    },
    wrappedNativeToken: {
      default: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      rinkeby: "0xc778417e063141139fce010982780140aa0cd5ab",
      bsc: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "bsc-test": "0x2Cf210ad0a8f31D8A7b5742931B9C3ECb663cdB8",
      "bsc-test-2": "0x2Cf210ad0a8f31D8A7b5742931B9C3ECb663cdB8",
    },
  },
  packager: {
    contracts: [
      "Baks",
      "Bank",
      "Core",
      "ChainlinkPriceOracle",
      "DevelopmentFund",
      "ExchangeFund",
    ],
    includeFactories: true,
  },
};

export default config;
