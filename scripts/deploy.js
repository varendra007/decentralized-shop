const hre = require('hardhat');

async function main() {
	const Payment = await hre.ethers.getContractFactory('payment'); //fetching bytecode and ABI
	const payment = await Payment.deploy(); //creating an instance of our smart contract

	await payment.deployed(); //deploying your smart contract

	console.log('Deployed contract address:', `${payment.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
