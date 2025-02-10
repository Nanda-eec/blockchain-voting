import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LoginWithMetaMask from './components/LoginWithMetaMask';
import VotingComponent from './components/VotingComponent';
import VotingContract from '../artifacts/contracts/Voting.sol/Voting.json';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isVotingOpen, setIsVotingOpen] = useState(false);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const votingContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, VotingContract.abi, signer);
                setContract(votingContract);
                
                const votingStatus = await votingContract.isVotingOpen();
                setIsVotingOpen(votingStatus);
            }
        };

        loadBlockchainData();
    }, []);

    const handleAccountChange = (newAccount) => {
        setAccount(newAccount);
    };

    return (
        <div>
            <h1>Blockchain Voting System</h1>
            {account ? (
                <VotingComponent contract={contract} isVotingOpen={isVotingOpen} />
            ) : (
                <LoginWithMetaMask onAccountChange={handleAccountChange} />
            )}
        </div>
    );
};

export default App;