import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract", function () {
    let Voting;
    let voting;
    let owner;
    let voter1;
    let voter2;

    beforeEach(async function () {
        Voting = await ethers.getContractFactory("Voting");
        [owner, voter1, voter2] = await ethers.getSigners();
        voting = await Voting.deploy();
        await voting.deployed();
    });

    it("Should register a voter", async function () {
        await voting.registerVoter(voter1.address);
        expect(await voting.isRegistered(voter1.address)).to.be.true;
    });

    it("Should not allow a disqualified voter to register", async function () {
        await voting.registerVoter(voter1.address);
        await voting.disqualifyVoter(voter1.address);
        await expect(voting.registerVoter(voter1.address)).to.be.revertedWith("Voter is disqualified");
    });

    it("Should allow a registered voter to cast a vote", async function () {
        await voting.registerVoter(voter1.address);
        await voting.castVote(1, { from: voter1.address });
        expect(await voting.getVoteCount(1)).to.equal(1);
    });

    it("Should not allow a voter to vote twice", async function () {
        await voting.registerVoter(voter1.address);
        await voting.castVote(1, { from: voter1.address });
        await expect(voting.castVote(1, { from: voter1.address })).to.be.revertedWith("Voter has already voted");
    });

    it("Should count votes correctly", async function () {
        await voting.registerVoter(voter1.address);
        await voting.registerVoter(voter2.address);
        await voting.castVote(1, { from: voter1.address });
        await voting.castVote(2, { from: voter2.address });
        expect(await voting.getVoteCount(1)).to.equal(1);
        expect(await voting.getVoteCount(2)).to.equal(1);
    });

    it("Should prevent unauthorized access to vote counting", async function () {
        await expect(voting.countVotes()).to.be.revertedWith("Only owner can count votes");
    });

    it("Should allow owner to count votes", async function () {
        await voting.registerVoter(voter1.address);
        await voting.registerVoter(voter2.address);
        await voting.castVote(1, { from: voter1.address });
        await voting.castVote(2, { from: voter2.address });
        await voting.countVotes();
        expect(await voting.getResults()).to.exist;
    });
});