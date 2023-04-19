import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
export default function ItemCard({ el }) {
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
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
