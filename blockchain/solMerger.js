const { merge } = require("sol-merger");
const fs = require("fs/promises");

const mergeContracts = async (inputFile, outputFile) => {
  try {
    console.log(`Merging Solidity contract: ${inputFile}`);
    
    const mergedCode = await merge(inputFile);
    
    console.log("Merge successful. Writing to output file...");
    await fs.writeFile(outputFile, mergedCode, "utf8");
    
    console.log(`Merged contract saved to: ${outputFile}`);
  } catch (error) {
    console.error("Error merging contracts:", error);
  }
};

const main = async () => {
  const inputContract = "./contracts/TriToken.sol";
  const outputContract = "./o.sol";
  
  console.log("Starting Solidity contract merge process...");
  await mergeContracts(inputContract, outputContract);
  console.log("Process completed.");
};

main();