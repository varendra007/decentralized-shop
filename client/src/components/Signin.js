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

const theme = createTheme();

const SignIn = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [Warning, setWarning] = React.useState('');
	const [warnColor, setWarnColor] = React.useState('red');
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:4000/api/login', {
				email,
				password,
			})
			.then((res) => {
				console.log(res);
				if (res.data.status == 'error') {
					setWarning(res.data.message);
					setWarnColor('red');
					return;
				}
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('add', res.data.user.add);
				localStorage.setItem('email', email);
				setWarning('Account Logged in Successfully');
				setWarnColor('green');
				setTimeout(() => {
					window.location.href = '/store';
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
				setWarning(err.response.data.message);
				setWarnColor('red');
			});
	};
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
									Sign in
								</Typography>
								<Box
									component="form"
									noValidate
									sx={{ mt: 3 }}
									// onSubmit={handleSubmit}
								>
									<Grid container spacing={2}>
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
									</Grid>
									{Warning !== '' && (
										<Grid style={{ color: warnColor }}>{Warning}</Grid>
									)}
									<Button
										fullWidth
										variant="contained"
										type="submit"
										sx={{ mt: 3, mb: 2 }}
										disabled={!(email && password)}
										onClick={handleSubmit}
									>
										Sign In
									</Button>
									<Grid container justifyContent="flex-end">
										{/* <Grid item>
                      <Link href="/checkout-cart/signup" variant="body2">
                        Don't have an account? Sign un
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

export default SignIn;
