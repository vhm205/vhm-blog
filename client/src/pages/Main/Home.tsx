import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { TypographyProps } from '@material-ui/core/Typography';
import { useCommonStyles } from '../../styles/commonStyle';
import { getRandomItem } from '../../utils';
import { Loading } from '../../components/CustomField';
import Post from './Post';
import RightSide from './RightSide';

const variants = ['h2', 'body1', 'h5', 'body2'] as TypographyProps['variant'][];
const colors = [
	'#0984e3',
	'#6c5ce7',
	'#ff7675',
	'#e84393',
	'#686de0',
	'#81ecec',
];

const Home: React.FC = () => {
	const classes = useCommonStyles();
	const [loading, setLoading] = React.useState<boolean>(true);

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
				<Grid item xs={12} md={8}>
					{colors.map((color) =>
						loading ? (
							<Loading key={color} variants={variants} />
						) : (
							// <Post key={color} color={getRandomItem(colors)} />
							<Post key={color} color={'black'} />
						)
					)}
					<Pagination
						count={10}
						variant="outlined"
						color="primary"
						showLastButton={true}
						showFirstButton={true}
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<RightSide />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
