const { ethers } = require("hardhat");

const triTokenAdd = "0x9e71665d95b6d3193EFb90A2085331EFe46861ce";
const biTokenAdd = "0xc7cFdd590F3F7ac83C7bB6Ec24a897B0dcB00080";
const uniOracleAdd = "0xfB00f584244eAAeCF363b91A3EaF2d6b04a34621";
// const lqopAdd = "0x98ba2A1866c8e2F438b1Aac0F936bD18B019BDee";
// const router = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("main ~ deployer address:", deployer.address);

  const TriToken = await ethers.getContractFactory("TriToken");
  const triToken = await TriToken.attach(triTokenAdd);
  console.log(
    "TriToken balanceOf",
    await triToken.approve(router, "1000000000000000000000000")
  );

  const BiToken = await ethers.getContractFactory("BiToken");
  const biToken = await BiToken.attach(biTokenAdd);
  console.log(
    "biToken balanceOf",
    await biToken.approve(router, "1000000000000000000000000")
  );

  // const LqOP = await ethers.getContractFactory("LqOP");
  // const lqOP = await LqOP.attach(lqopAdd);
  // await uniOracle.createPair(biTokenAdd,triTokenAdd)
  // console.log("pair address", await uniOracle.pair());
  // await lqOP.addliquidity();
}

main();
