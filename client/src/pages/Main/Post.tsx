import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

interface PostProps {
	color: string;
}

const Post: React.FC<PostProps> = ({ color }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					Admin
				</Typography>
				<Typography variant="h5" component="h2">
					<NavLink to="/post" style={{ color }}>
						This is the title
					</NavLink>
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					20/05/2001 - Lượt xem: 1.000.000
				</Typography>
				<Typography variant="body2" component="p">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolorum
					repellat laudantium vero molestias, eaque suscipit odit officia rerum
					in soluta molestiae, eos unde. Doloribus eveniet aspernatur error
					suscipit nobis.
				</Typography>
			</CardContent>
			<CardActions>
				{/* color="primary" variant="contained" */}
				<Button size="medium" color="primary">
					Read More
				</Button>
			</CardActions>
		</Card>
	);
};

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		marginBottom: 20,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default Post;
