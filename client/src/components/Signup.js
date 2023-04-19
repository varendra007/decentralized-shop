import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fade } from 'react-reveal';
import axios from 'axios';
import Web3 from 'web3';
import { useEffect } from 'react';

const theme = createTheme();

const SignUP = () => {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [Warning, setWarning] = React.useState('');
	const [warnColor, setWarnColor] = React.useState('red');
	const [account, setAccount] = React.useState('');
	const [accounts, setAccounts] = React.useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();

		const tmp = async () => {
			try {
				const { ethereum } = window;
				const account1 = await ethereum.request({
					method: 'eth_requestAccounts',
				});
				window.ethereum.on('accountsChanged', () => {
					window.location.reload();
				});
				setAccount(account1);
				// console.log(account);
				axios.get('http://localhost:4000/api/getusers').then((res) => {
					console.log(res.data);
					// if (account in accounts) {
					// 	console.log('Account already exists');
					// }

					for (let i = 0; i < res.data.length; i++) {
						// console.log(accounts[i].toLowerCase());
						if (res.data[i].add.toLowerCase() == account1) {
							console.log('Account already exists');
							console.log(accounts[i]);
							window.alert(
								'Account already exists. Please select different metamask account'
							);
							return 0;
						}
					}
					if (password !== confirmPassword) {
						setWarning('Password and Confirm Password must be same');
						setWarnColor('red');
						return;
					}
					axios
						.post('http://localhost:4000/api/signup', {
							firstName,
							lastName,
							email,
							password,
							confirmPassword,
							add: account1,
						})
						.then((res) => {
							console.log(res);
							setWarning('Account Created Successfully');
							setWarnColor('green');
							setTimeout(() => {
								window.location.href = '/signin';
							}, 3000);
						})
						.catch((err) => {
							console.log(err);
							setWarning(err.response.data.msg);
							setWarnColor('red');
						});
					// return 0;
				});
			} catch (err) {
				console.log(err);
				setWarning('Please connect to metamask');
				setWarnColor('red');
			}
		};
		tmp();
	};
	useEffect(() => {
		async function getAccounts() {
			// Connect to local Ganache instance
			const web3 = new Web3('http://localhost:7545');

			// Get list of accounts from Ganache
			const accounts = await web3.eth.getAccounts();
			setAccounts(accounts);
			// console.log(accounts);
		}

		getAccounts();
	}, []);
	return (
		// <Container>
		<div>
			<Fade bottom duration={2000} distance="40px">
				{/* <Header theme={theme} /> */}

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						width: '100vw',
					}}
				>
					<ThemeProvider theme={theme}>
						<Container component="main" maxWidth="xs">
							<CssBaseline />
							<Box
								sx={{
									// marginTop: 8,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography component="h1" variant="h5">
									Sign up
								</Typography>
								<Box
									component="form"
									noValidate
									sx={{ mt: 3 }}
									// onSubmit={handleSubmit}
								>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<TextField
												autoComplete="given-name"
												name="firstName"
												required
												fullWidth
												id="firstName"
												label="First Name"
												autoFocus
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												id="lastName"
												label="Last Name"
												name="lastName"
												autoComplete="family-name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id="email"
												label="Email Address"
												name="email"
												autoComplete="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="new-password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												name="password"
												label="Confirm Password"
												type="password"
												id="password"
												autoComplete="new-password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Grid>
									</Grid>
									{Warning !== '' && (
										<Grid style={{ color: warnColor }}>{Warning}</Grid>
									)}
									<Button
										fullWidth
										variant="contained"
										type="submit"
										sx={{ mt: 3, mb: 2 }}
										// disabled={
										// 	!(
										// 		firstName &&
										// 		lastName &&
										// 		email &&
										// 		password &&
										// 		confirmPassword
										// 	)
										// }
										onClick={handleSubmit}
									>
										Sign Up
									</Button>
									<Grid container justifyContent="flex-end">
										{/* <Grid item>
                      <Link href="#" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid> */}
									</Grid>
								</Box>
							</Box>
						</Container>
					</ThemeProvider>
				</div>
			</Fade>
		</div>
		// </Container>
	);
};

export default SignUP;
