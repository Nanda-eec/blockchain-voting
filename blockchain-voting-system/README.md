# Blockchain Voting System

This project implements a blockchain-based voting system using the Ethereum blockchain. It ensures secure, transparent, and tamper-proof voting while maintaining voter anonymity and eligibility verification.

## Features

1. **Voter Eligibility and Authentication**
   - Unique voter verification through biometric authentication or cryptographic keys.
   - Disqualification checks to prevent voting by ineligible individuals.

2. **Secure and Transparent Voting Process**
   - Immutable ledger to ensure votes cannot be altered once cast.
   - Anonymity and privacy for voters while allowing verification.
   - Decentralized verification using smart contracts.

3. **Prevention of Electoral Malpractices**
   - Anti-tampering mechanisms to prevent booth capturing and multiple votes.
   - End-to-end encryption to protect votes from interception.
   - Audit trail providing a tamper-proof record of all transactions.

4. **Transparent Vote Counting and Result Declaration**
   - Automated vote counting for transparency.
   - Recounting mechanism for discrepancies.
   - Public ledger access for independent verification of results.

5. **Election Administration Compliance**
   - Role-based access for election officials and observers.
   - Secure voter roll management compliant with registration laws.
   - Smart contract-based nomination and withdrawal processes.

## Project Structure

```
blockchain-voting-system
├── contracts
│   └── Voting.sol          # Smart contract for the voting system
├── scripts
│   └── deploy.js           # Script to deploy the smart contract
├── test
│   └── Voting.test.js      # Test cases for the smart contract
├── frontend
│   ├── public
│   │   └── index.html      # Main HTML file for the frontend
│   ├── src
│   │   ├── App.tsx         # Main React component
│   │   ├── index.tsx       # Entry point for the React application
│   │   └── components
│   │       ├── LoginWithMetaMask.tsx # Component for MetaMask login
│   │       └── VotingComponent.tsx    # Component for voting interface
│   ├── package.json        # Frontend dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration for frontend
├── package.json             # Project dependencies and scripts
├── hardhat.config.js        # Hardhat configuration for Ethereum development
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask wallet installed in your browser
- Hardhat installed globally

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blockchain-voting-system
   ```

2. Install dependencies:
   ```
   npm install
   cd frontend
   npm install
   ```

### Running the Project

1. Deploy the smart contract:
   ```
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Usage

- Connect your MetaMask wallet to authenticate.
- Follow the prompts to register as a voter and cast your vote.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.