const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const candidateNames = ["Alice", "Bob", "Charlie"];
    const Voting = await ethers.getContractFactory("Voting");
    const votingContract = await Voting.deploy(candidateNames);
    await votingContract.deployed();

    console.log("Voting contract deployed to:", votingContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });