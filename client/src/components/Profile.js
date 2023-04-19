import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemCard from './Item';
import { Box, Grid, Modal, Typography } from '@mui/material';
import Web3 from 'web3';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
const Profile = () => {
	useEffect(() => {
		let email = window.localStorage.getItem('email');
		if (email == null) {
			window.location.href = '/error';
		}
	}, []);
	const [account, setAccount] = useState('');
	const [items, setItems] = useState([]);
	// const [transactions, setTransactions] = useState([]);
	const [block, setBlock] = useState({});
	const [open, setOpen] = useState(false);
	const handleOpen = (index) => {
		console.log(items[index].transactionId);
		getBlockDetails(items[index].transactionId);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	// useEffect(() => {
	async function getBlockDetails(txHash) {
		// Connect to local Ganache instance
		const web3 = new Web3('http://localhost:7545');

		// Get transaction details
		const tx = await web3.eth.getTransaction(txHash);
		console.log(tx);
		// Get block details
		const block_ = await web3.eth.getBlock(tx.blockNumber);
		setBlock(block_);
		console.log(block_);
		// // Log block details to console
		// console.log(`Block Number: ${block.number}`);
		// console.log(`Timestamp: ${new Date(block.timestamp * 1000)}`);
		// console.log(`Hash: ${block.hash}`);
		// console.log(`Parent Hash: ${block.parentHash}`);
		// console.log(`Gas Used: ${block.gasUsed}`);
		// console.log(`Miner: ${block.miner}`);
	}

	// Call function with transaction hash as argument

	// }, []);
	useEffect(() => {
		axios
			.get(
				`http://localhost:4000/api/getUser?email=${localStorage.getItem(
					'email'
				)}`
			)
			.then((res) => {
				console.log(res.data);
				setAccount(res.data.user);
				axios
					.get(
						`http://localhost:4000/api/getuseritems?email=${localStorage.getItem(
							'email'
						)}`
					)
					.then((res) => {
						console.log(res.data);
						setItems(res.data.items);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div>
			<h1>
				{account.firstName} {account.lastName}
			</h1>
			<h2>{account.email}</h2>
			<p>
				<b>Account Id: </b>
				{account.add}
			</p>
			<hr />
			<h2>Items Purchased</h2>
			{/* <hr /> */}
			{/* {items.map((item) => {
				return <ItemCard key={item._id} el={item} />;
			})} */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Ledger Details
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<b>Block Number: </b>
						{block.number}
						<br />
						<b>Timestamp: </b>
						{new Date(block.timestamp * 1000).toLocaleString()}
						<br />
						<b>Difficulty: </b>
						{block.difficulty}
						<br />
						<b>Hash: </b>
						{block.hash}
						<br />
						<b>Parent Hash: </b>
						{block.parentHash}
						<br />
						<b>Gas Used: </b>
						{block.gasUsed}
						<br />
						<b>Miner: </b>
						{block.miner}
						<br />
					</Typography>
				</Box>
			</Modal>
			<Box sx={{ flexGrow: 1 }} alignContent={'center'}>
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					lignItems={'center'}
					alignSelf={'center'}
					alignContent={'center'}
					textAlign={'center'}
				>
					{items.map((el, index) => (
						<Grid
							item
							xs={2}
							sm={4}
							md={4}
							key={index}
							alignItems={'center'}
							alignSelf={'center'}
							alignContent={'center'}
							textAlign={'center'}
						>
							<div
								onClick={() => {
									handleOpen(index);
								}}
							>
								<ItemCard el={el} />
							</div>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
};

export default Profile;
