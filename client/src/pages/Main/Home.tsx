import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { NavLink, useParams } from 'react-router-dom';
import { useCommonStyles } from '../../styles/commonStyle';
import { Loading } from '../../components/CustomField';
import CmsAPI from '../../services/cmsService';
import Post from './LeftSide/Post';
import RightSide from './RightSide/RightSide';

const variants = ['h2', 'body1', 'h5', 'body2'] as TypographyProps['variant'][];
// const colors = [
// 	'#0984e3',
// 	'#6c5ce7',
// 	'#ff7675',
// 	'#e84393',
// 	'#686de0',
// 	'#81ecec',
// ];

const Home: React.FC = () => {
	const classes = useCommonStyles();
	const { category } = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState<PostsResponse>({
		posts: [],
		page: 1,
		perPage: 5,
		total: 10,
	});

	const getPosts = React.useCallback(
		async (page: number) => {
			try {
				setLoading(true);

				const result: responsePosts = await (category
					? CmsAPI.getPostByCategory(page, category)
					: CmsAPI.getPosts(page));

				setPagination(result);
			} finally {
				setLoading(false);
			}
		},
		[category]
	);

	useEffect(() => {
		const abort = new AbortController();
		getPosts(pagination.page);
		return () => {
			abort.abort();
		};
	}, [getPosts, pagination.page]);

	const handleNextPage = (_: object, page: number) => getPosts(page);

	return (
		<Box className={classes.paper} m={2}>
			<Grid container justify="center">
				<Grid item xs={12} md={8}>
					{category && (
						<Breadcrumbs aria-label="breadcrumb">
							<NavLink color="inherit" to="/">
								Home
							</NavLink>
							<Typography color="textPrimary">{category}</Typography>
						</Breadcrumbs>
					)}
					{loading && new Array(5).map(() => <Loading variants={variants} />)}
					{pagination &&
						pagination.posts.map((post) => (
							<Post key={post._id} color={'black'} post={post} />
						))}
					{pagination.posts.length > 0 ? (
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
					) : (
						<Box
							mt={5}
							p={3}
							style={{
								boxShadow: ' 4px 7px 11px -2px rgba(0,0,0,0.29)',
								border: '1px solid black',
								borderRadius: 10,
							}}
						>
							<Typography color="textPrimary" variant="h4" align="center">
								Not found result
							</Typography>
						</Box>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
					<RightSide />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
