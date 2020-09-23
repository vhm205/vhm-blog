import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { TypographyProps } from '@material-ui/core/Typography';
import { useCommonStyles } from '../../styles/commonStyle';
import { Loading } from '../../components/CustomField';
import CmsAPI from '../../services/cmsService';
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
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState<PostsResponse>({
		posts: [],
		page: 1,
		perPage: 5,
		total: 10,
	});

	const getPosts = async (page: number) => {
		try {
			setLoading(true);
			const result: responsePosts = await CmsAPI.getPosts(page);
			setPagination(result);
		} catch (error) {
			console.error(error, error.response);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const abort = new AbortController();
		getPosts(pagination.page);
		return () => {
			abort.abort();
		};
	}, []);

	const handleNextPage = (_: object, page: number) => getPosts(page);

	return (
		<Box className={classes.paper} m={2}>
			<Grid container justify="center">
				<Grid item xs={12} md={8}>
					{loading && new Array(5).map(() => <Loading variants={variants} />)}
					{pagination &&
						pagination.posts.map((post) => (
							<Post key={post._id} color={'black'} post={post} />
						))}
					<Pagination
						count={Math.ceil(pagination.total / pagination.perPage)}
						page={pagination.page}
						shape="rounded"
						variant="outlined"
						color="primary"
						showLastButton={true}
						showFirstButton={true}
						onChange={handleNextPage}
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
