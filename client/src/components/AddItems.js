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
import { StoreMallDirectory } from '@mui/icons-material';

// import Loader from '../../assests/Loader'
// import Header from '../../compo  nents/header/Header'
// import { Container } from '.'

const theme = createTheme();

const AddItem = () => {
	React.useEffect(() => {
		let email = window.localStorage.getItem('email');
		if (email == null) {
			window.location.href = '/error';
		}
	}, []);
	const [title, SetTitle] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [img, setImage] = React.useState('');
	// const [ownerId, setOwnerId] = React.useState('');
	const [Warning, setWarning] = React.useState('');
	const [warnColor, setWarnColor] = React.useState('red');
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:4000/api/add-item', {
				title,
				price,
				description,
				img,
				add: localStorage.getItem('add'),
			})
			.then((res) => {
				console.log(res);
				setWarning('Item Added Successfully');
				setWarnColor('green');
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
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
									<StoreMallDirectory />
								</Avatar>
								<Typography component="h1" variant="h5">
									Add Item
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
												label="Name of Item"
												value={title}
												onChange={(e) => SetTitle(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												label="Description"
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												type="number"
												fullWidth
												label="Price"
												value={price}
												onChange={(e) => setPrice(e.target.value)}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												label="Image url"
												value={img}
												onChange={(e) => setImage(e.target.value)}
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
										disabled={!(title && price && description && img)}
										onClick={handleSubmit}
									>
										Add Item
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

export default AddItem;
