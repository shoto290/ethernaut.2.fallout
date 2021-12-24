import { ethers } from "hardhat";

async function main() {
  const Derive = await ethers.getContractFactory("Derive");
  const derive = await Derive.deploy("0x723DC9cbec2A67c9BE4DD072d021Cd2e72E65f65");
  await derive.deployed();
  console.log("Deployed Derive at", derive.address);

  await derive.donate({ value: ethers.utils.parseEther("0.2") });
  console.log("Function donate ok");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
