import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { ethers } from 'ethers';
import abi from '../contractJson/payment.json';
import axios from 'axios';
export default function ShoppingCard({ el }) {
	var state = {
		provider: null,
		signer: null,
		contract: null,
	};
	const template = async (add) => {
		const contractAddres = `${add}`;
		const contractABI = abi.abi;
		try {
			const { ethereum } = window;
			const account = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			// const accounts = await

			window.ethereum.on('accountsChanged', () => {
				window.location.reload();
			});
			setAccount(account);
			const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
			const signer = provider.getSigner(); //write the blockchain

			const contract = new ethers.Contract(contractAddres, contractABI, signer);
			console.log(contract);

			state = { provider, signer, contract };
			console.log({ provider, signer, contract });

			window.localStorage.setItem('state', state);
			console.log(localStorage.getItem('state'));
		} catch (error) {
			console.log(error);
		}
	};
	const buy = async (event, add, price) => {
		event.preventDefault();
		await template(add);
		const { contract } = state;
		const amount = { value: ethers.utils.parseEther(`${price}`) };
		const transaction = await contract.buyItem(amount);

		await transaction.wait();
		console.log(transaction);
		// alert('Transaction is successul');
		axios
			.post('http://localhost:4000/api/buy/', {
				itemId: el._id,
				price: price,
				user: localStorage.getItem('email'),
				paymentId: transaction.hash,
			})
			.then((res) => {
				console.log(res);
				alert(
					'Transaction is successul! Please find your item in your profile.'
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [account, setAccount] = useState('Not connected');

	// useEffect(() => {

	// }, []);
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					// image="https://picsum.photos/200/300"
					image={el.img}
					alt="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{el.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{el.description}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{el.price} ETH
					</Typography>
					<br />
					<Button
						variant="contained"
						onClick={(e) => {
							buy(e, el.add, el.price);
						}}
					>
						Buy
					</Button>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
