// filepath: contracts/Voting.sol
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        bool isDisqualified;
        uint256 vote;
    }

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public electionCommission;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint256 public totalVotes;

    event VoterRegistered(address voter);
    event Voted(address voter, uint256 candidateId);
    event VoterDisqualified(address voter);

    modifier onlyElectionCommission() {
        require(msg.sender == electionCommission, "Only election commission can call this function");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        _;
    }

    constructor(string[] memory candidateNames) {
        electionCommission = msg.sender;
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(i, candidateNames[i], 0));
        }
    }

    function registerVoter(address voterAddress) public onlyElectionCommission {
        require(!voters[voterAddress].isRegistered, "Voter is already registered");
        voters[voterAddress].isRegistered = true;
        emit VoterRegistered(voterAddress);
    }

    function disqualifyVoter(address voterAddress) public onlyElectionCommission {
        require(voters[voterAddress].isRegistered, "Voter is not registered");
        voters[voterAddress].isDisqualified = true;
        emit VoterDisqualified(voterAddress);
    }

    function vote(uint256 candidateId) public hasNotVoted {
        require(voters[msg.sender].isRegistered, "You must be a registered voter");
        require(!voters[msg.sender].isDisqualified, "You are disqualified from voting");
        require(candidateId < candidates.length, "Invalid candidate ID");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = candidateId;
        candidates[candidateId].voteCount++;
        totalVotes++;
        emit Voted(msg.sender, candidateId);
    }

    // Add additional view functions as needed...
}