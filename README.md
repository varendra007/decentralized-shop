## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/)

## Setting Up

### 1. Download and extract the codes

### 2. Install Dependencies:

- `npm install --force`

- `cd backend` then `npm install --force`

- `cd .. ` then `cd client` then `npm install --force`

Then navigate to the root folder and run

### 3. Run tests

`npx hardhat test`

### 4. Start Hardhat node

`npx hardhat node`

### 5. Run deployment script

In a separate terminal execute:
`npx hardhat run ./scripts/deploy.js --network localhost`

After running the command copy `/artifacts/contracts/payment.sol/payment.json` file in `/client/src/contractJson/` folder to access the build smart contract with frontend.

### 6. Start backend

`cd backend` and `node server.js`

### 6. Start Ganache and metamask setup

Start ganace and run a local workspace server. Using `MNEMONIC` generated by ganache link your metamask wallet by importing wallet.

### 7. Start frontend

In the client director

`npm start`

Done with the project setup now use the interactive frontend interface to interact with the application
