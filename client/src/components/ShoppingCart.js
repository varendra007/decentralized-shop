import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ShoppingCard from './Card';
import axios from 'axios';
// import Web3 from 'web3';
// const itmm = [
// 	{
// 		id: 1,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09a74b1023f2497989f9ad55005f1538_9366/CLEAR_FACTOR_SHOES_Black_EX2038_01_standard.jpg',
// 		title: 'Shoe',
// 		price: 16,
// 	},
// 	{
// 		id: 2,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81m3bRVpEqL._SL1500_.jpg',
// 		title: 'Cooling Pad',
// 		price: 21,
// 	},
// 	{
// 		id: 3,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg',
// 		title: 'Laptop',
// 		price: 12,
// 	},
// 	{
// 		id: 4,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'http://cdn.shopify.com/s/files/1/0057/8938/4802/store/3-2.png?v=1653637007',
// 		title: 'Watch',
// 		price: 18,
// 	},
// 	{
// 		id: 5,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61Y30DpqRVL._SX522_.jpg',
// 		title: 'Macbook Pro',
// 		price: 16,
// 	},
// 	{
// 		id: 6,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://content.rolex.com/dam/watches/family-pages/cosmograph-daytona/all-models/professional-watches-cosmograph-daytona-share_m116518ln_0040_1706jva_001_r.jpg',
// 		title: 'Rolex',
// 		price: 21,
// 	},
// 	{
// 		id: 7,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1674042508/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/228519_0_kncroo.png/mxw_640,f_auto',
// 		title: 'Headphone',
// 		price: 12,
// 	},
// 	{
// 		id: 8,
// 		description: 'lorem ipsum dollor shit',
// 		img: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/a/carmen_base_27_starrywhite_hdcam_swissbriekbm_front.png',
// 		title: 'Desktop',
// 		price: 16,
// 	},
// ];
export default function ShoppingCart() {
	const [items, setItems] = useState([{}]);
	useEffect(() => {
		let email = window.localStorage.getItem('email');
		if (email == null) {
			window.location.href = '/error';
		}
	}, []);
	useEffect(() => {
		axios
			.get('http://localhost:4000/api/get-items')
			.then((res) => {
				console.log(res);
				setItems(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	// const [state, setState] = useState({
	// 	provider: null,
	// 	signer: null,
	// 	contract: null,
	// });
	// const [account, setAccount] = useState('Not connected');

	// useEffect(() => {
	// 	const template = async () => {
	// 		const contractAddres = '0xB1aE08038AD69EC4f0c6b0df0e245eeAf9863ee8';
	// 		// const contractAddres="0xa64e3144835aF8781c750ceC432784a68d883266";
	// 		const contractABI = abi.abi;
	// 		//Metamask part
	// 		//1. In order do transactions on goerli testnet
	// 		//2. Metmask consists of infura api which actually help in connectig to the blockhain
	// 		try {
	// 			const { ethereum } = window;
	// 			const account = await ethereum.request({
	// 				method: 'eth_requestAccounts',
	// 			});
	// 			// const accounts = await
	// 			// const accounts = await window.ethereum.request({
	// 			// 	method: 'eth_accounts',
	// 			// });
	// 			// console.log(accounts);
	// 			// setAccounts(accounts);
	// 			// console.log(window.web3);
	// 			// console.log(account);
	// 			window.ethereum.on('accountsChanged', () => {
	// 				window.location.reload();
	// 			});
	// 			setAccount(account);
	// 			const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
	// 			const signer = provider.getSigner(); //write the blockchain

	// 			const contract = new ethers.Contract(
	// 				contractAddres,
	// 				contractABI,
	// 				signer
	// 			);
	// 			console.log(contract);

	// 			setState({ provider, signer, contract });
	// 			console.log({ provider, signer, contract });

	// 			window.localStorage.setItem('state', state);
	// 			console.log(localStorage.getItem('state'));
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	template();
	// }, []);
	return (
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
						<ShoppingCard el={el} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
