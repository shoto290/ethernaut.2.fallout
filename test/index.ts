import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Derive = await ethers.getContractFactory("Derive");
    const derive = await Derive.deploy("0x2DbCfb9574ccFA9564e825c26E8ef33c76d30A92");
    await derive.deployed();
  });
});