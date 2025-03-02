const { ethers, upgrades } = require("hardhat");

const stakingTokenAdd = "0xB58EEC46081E5F192A9d8B4817a5e938667bB368"; // sepolia network address
const rewardTokenAdd = "0xB58EEC46081E5F192A9d8B4817a5e938667bB368"; // sepolia network address

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("main ~ deployer address:", deployer.address);

  // const TriToken = await ethers.getContractFactory("TriToken");
  // const triBase = await TriToken.deploy();
  // const triAddress = await triBase.getAddress();

  // console.log("triAddress:", triAddress);

  // const BiToken = await ethers.getContractFactory("BiToken");

  // const biBase = await BiToken.deploy();
  // const biAddress = await biBase.getAddress();

  // console.log("biAddress:", biAddress);

  // const UniOracle = await ethers.getContractFactory("UniOracle");
  // const uniBase = await UniOracle.deploy();
  // const uniAddress = await uniBase.getAddress();

  // console.log("UniOracle contract address:", uniAddress);

  const LqOP = await ethers.getContractFactory("LqOP");
  const lqOP = await LqOP.deploy();
  const lqopAddress = await lqOP.getAddress();

  console.log("LqOP contract address:", lqopAddress);
  // ================== UPGRADE ================= 0xF078D98e80073F23139381A6E0Ea119C3Fa06fF6
  // for contract upgrade,  use below code.

  // const ZentuStaking = await ethers.getContractFactory("ZentuLPStaking");
  // await upgrades.upgradeProxy("mainnet address here", ZentuStaking);
  // console.log("Box upgraded");
}

main();
