import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import VotingContract from '../../artifacts/contracts/Voting.sol/Voting.json';

const VotingComponent = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                const networkId = await provider.getNetwork();
                const deployedNetwork = VotingContract.networks[networkId.chainId];
                const votingContract = new ethers.Contract(deployedNetwork.address, VotingContract.abi, signer);
                setContract(votingContract);

                const candidatesList = await votingContract.getCandidates();
                setCandidates(candidatesList);
                
                const hasVoted = await votingContract.voters(address);
                setVoted(hasVoted);

                setLoading(false);
            } else {
                alert('Please install MetaMask!');
            }
        };

        loadBlockchainData();
    }, []);

    const handleVote = async (candidateId) => {
        if (contract) {
            setLoading(true);
            try {
                const tx = await contract.vote(candidateId);
                await tx.wait();
                alert('Vote cast successfully!');
                setVoted(true);
            } catch (error) {
                console.error(error);
                alert('Error casting vote. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Voting Component</h2>
            <p>Account: {account}</p>
            {voted ? (
                <p>You have already voted.</p>
            ) : (
                <div>
                    <h3>Candidates</h3>
                    <ul>
                        {candidates.map((candidate, index) => (
                            <li key={index}>
                                {candidate.name} - Votes: {candidate.voteCount.toString()}
                                <button onClick={() => handleVote(index)}>Vote</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VotingComponent;