// filepath: migrations/2_deploy_contracts.js
const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
    const candidateNames = ["Alice", "Bob", "Charlie"];
    deployer.deploy(Voting, candidateNames);
};