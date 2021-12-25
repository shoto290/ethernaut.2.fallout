import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("HelloWorld");
  const contract = await Contract.deploy();
  console.log("Deploy HelloWorld contract at", contract.address);

  const sayHelloTx = await contract.sayHello();
  await sayHelloTx.wait();
  console.log("Transaction sayHello finished", sayHelloTx.returns);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
