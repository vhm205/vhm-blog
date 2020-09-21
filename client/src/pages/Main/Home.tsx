import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Post from './Post';
import { useCommonStyles } from '../../styles/commonStyle';
import { getRandomItem } from '../../utils';

const variants = ['h2', 'body1', 'h5', 'body2'] as TypographyProps['variant'][];

const Loading: React.FC = () => {
	return (
		<div>
			{variants.map((variant) => (
				<Typography
					component="div"
					key={variant}
					variant={variant}
					gutterBottom
				>
					<Skeleton />
				</Typography>
			))}
		</div>
	);
};

const Home: React.FC = () => {
	const classes = useCommonStyles();
	const [loading, setLoading] = React.useState(true);

	const colors = [
		'#0984e3',
		'#6c5ce7',
		'#ff7675',
		// '#ffeaa7',
		'#e84393',
		'#686de0',
		'#81ecec',
	];

	React.useEffect(() => {
		const abort = new AbortController();

		setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => {
			abort.abort();
		};
	}, []);

	return (
		<Box className={classes.paper} m={2}>
			<Grid container justify="center">
				<Grid item xs={10} md={10}>
					{colors.map((color) =>
						loading ? (
							<Loading key={color} />
						) : (
							<Post key={color} color={getRandomItem(colors)} />
						)
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
