import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "0x8d12A197cB00D4747a1fe03395095ce2A5CC6819";

async function main() {
  const ContractExample = await ethers.getContractFactory("ContractExample");
  const contractExample = await ContractExample.deploy(ETHERNAUT_ADDRESS);
  await contractExample.deployed();
  console.log("Deployed EmptyContract at", contractExample.address);

  const transaction = await contractExample.emptyContract({ value: ethers.utils.parseEther("0.2") });
  await transaction.wait()
  console.log("Transaction successfully at", transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
