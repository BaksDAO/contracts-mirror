import { FakeContract, smock } from "@defi-wonderland/smock";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { BigNumberish, ContractTransaction } from "ethers";
import { deployments, ethers } from "hardhat";
import { version as VERSION } from "./../../package.json";
import {
  Baks,
  BaksDAO,
  BaseToken,
  DevelopmentFund,
  ExchangeFund,
  IPriceOracle as PriceOracle,
  IUniswapV2Factory as UniswapV2Factory,
  IUniswapV2Pair as UniswapV2Pair,
  IUniswapV2Router as UniswapV2Router,
} from "./../../typechain";
import {
  COL,
  DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
  INITIAL_COL_PRICE,
  INITIAL_USER_COL_BALANCE,
} from "./constants";

export class Environment {
  constructor(
    public readonly governor: SignerWithAddress,
    public readonly minter: SignerWithAddress,
    public readonly user: SignerWithAddress,
    public readonly operator: SignerWithAddress,
    public readonly liquidator: SignerWithAddress,
    public readonly collateralToken: BaseToken,
    public readonly priceOracle: FakeContract<PriceOracle>,
    public readonly $: Baks,
    public readonly governedBaksDAO: BaksDAO,
    public readonly baksDao: BaksDAO,
    public readonly governedExchangeFund: ExchangeFund,
    public readonly exchangeFund: ExchangeFund,
    public readonly governedDevelopmentFund: DevelopmentFund,
    public readonly developmentFund: DevelopmentFund,
    public readonly uniswapV2Router: FakeContract<UniswapV2Router>,
    public readonly uniswapV2Pair: FakeContract<UniswapV2Pair>,
    public readonly wrappedNativeCurrency: SignerWithAddress,
  ) {}

  public setCollateralPrice(price: BigNumberish): void {
    this.priceOracle.getNormalizedPrice!.returns(price);
  }

  public async borrow(amount: BigNumberish): Promise<ContractTransaction> {
    await this.collateralToken.approve(
      this.baksDao.address,
      ethers.constants.MaxUint256,
    );
    return this.baksDao.borrow(this.collateralToken.address, amount);
  }

  public async deposit(
    loanId: number,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    await this.collateralToken.approve(
      this.baksDao.address,
      ethers.constants.MaxUint256,
    );
    return this.baksDao.deposit(loanId, amount);
  }

  public async repay(
    loanId: number,
    amount: BigNumberish,
  ): Promise<ContractTransaction> {
    await this.$.approve(this.baksDao.address, ethers.constants.MaxUint256);
    return this.baksDao.repay(loanId, amount);
  }
}

export const setupEnvironment = deployments.createFixture(async () => {
  await deployments.fixture();

  const { deploy } = deployments;
  const {
    deployer,
    minter,
    user,
    operator,
    liquidator,
    uniswapV2Router,
    wrappedNativeToken,
  } = await ethers.getNamedSigners();

  const chainlinkPriceOracle = await ethers.getContract("ChainlinkPriceOracle");
  const priceOracle = await smock.fake<PriceOracle>("ChainlinkPriceOracle", {
    address: chainlinkPriceOracle.address,
  });

  let $ = (await ethers.getContract("Baks")) as Baks;
  let baksDao = (await ethers.getContract("BaksDAO")) as BaksDAO;

  $ = $.connect(user!);
  baksDao = baksDao.connect(user!);
  const governedBaksDAO = baksDao.connect(deployer!);

  const { address: colAddress } = await deploy("BaseToken", {
    from: deployer!.address,
    args: [COL.NAME, COL.SYMBOL, COL.DECIMALS, VERSION, minter!.address],
  });
  let collateralToken = (await ethers.getContractAt(
    "BaseToken",
    colAddress,
  )) as BaseToken;
  collateralToken = collateralToken.connect(user!);

  // TODO: Move Uniswap mocks to another file
  const pair = await smock.fake<UniswapV2Pair>(
    await deployments.getArtifact("IUniswapV2Pair"),
  );
  pair.approve.returns(true);

  const factory = await smock.fake<UniswapV2Factory>(
    await deployments.getArtifact("IUniswapV2Factory"),
  );
  factory.getPair.returns(pair.address);

  const router = await smock.fake<UniswapV2Router>(
    (
      await deployments.getArtifact("IUniswapV2Router")
    ).abi,
    {
      address: uniswapV2Router!.address,
    },
  );
  router.factory.returns(factory.address);

  let exchangeFund = (await ethers.getContract("ExchangeFund")) as ExchangeFund;
  exchangeFund = exchangeFund.connect(user!);
  const governedExchangeFund = exchangeFund.connect(deployer!);

  let developmentFund = (await ethers.getContract(
    "DevelopmentFund",
  )) as DevelopmentFund;
  developmentFund = developmentFund.connect(user!);
  const governedDevelopmentFund = developmentFund.connect(deployer!);

  const env = new Environment(
    deployer!,
    minter!,
    user!,
    operator!,
    liquidator!,
    collateralToken,
    priceOracle,
    $,
    governedBaksDAO,
    baksDao,
    governedExchangeFund,
    exchangeFund,
    governedDevelopmentFund,
    developmentFund,
    router,
    pair,
    wrappedNativeToken!,
  );

  await env.collateralToken
    .connect(minter!)
    .mint(user!.address, INITIAL_USER_COL_BALANCE);

  await env.governedBaksDAO.listCollateralToken(
    collateralToken.address,
    DEFAULT_INITIAL_LOAN_TO_VALUE_RATIO,
  );

  env.setCollateralPrice(INITIAL_COL_PRICE);

  await env.governedExchangeFund.listDepositableToken(collateralToken.address);

  return env;
});
