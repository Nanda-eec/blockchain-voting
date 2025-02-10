import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const LoginWithMetaMask: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);
                } catch (err) {
                    setError('User denied account access');
                }
            } else {
                setError('MetaMask is not installed. Please install it to use this app.');
            }
        };

        loadWeb3();
    }, []);

    return (
        <div>
            <h2>Login with MetaMask</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {account ? (
                <p>Logged in as: {account}</p>
            ) : (
                <button onClick={() => window.ethereum && window.ethereum.request({ method: 'eth_requestAccounts' })}>
                    Connect MetaMask
                </button>
            )}
        </div>
    );
};

export default LoginWithMetaMask;