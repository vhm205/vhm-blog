import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { red } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams, NavLink } from 'react-router-dom';
import { formatDateTime } from '../../utils';
import RelatedPosts from './RelatedPosts';
import CmsAPI from '../../services/cmsService';

const labels: { [index: string]: string } = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

const PostDetail: React.FC = () => {
	const classes = useStyles();
	const { category, slug } = useParams();
	const [post, setPost] = useState<PostField>();
	const [postsRelated, setPostsRelated] = useState<PostField[]>();
	const [value, setValue] = React.useState<number | null>(2);
	const [hover, setHover] = React.useState(-1);

	useEffect(() => {
		(async () => {
			try {
				const postId = slug.split('-').pop();
				const resultPost: responsePost = await CmsAPI.getPostById(postId);
				const resultPostsRelated: responsePost = await CmsAPI.getPostsRelated(
					resultPost.category
				);
				setPost(resultPost);
				setPostsRelated(resultPostsRelated);
			} catch (error) {
				console.error(error, error.response);
			}
		})();
	}, [slug]);

	return post ? (
		<Box className={classes.box} m={2}>
			<Grid container justify="center">
				<Grid item xs={12} md={10}>
					<Breadcrumbs aria-label="breadcrumb">
						<NavLink color="inherit" to="/">
							Home
						</NavLink>
						<NavLink color="inherit" to={`/category/${category}`}>
							{category}
						</NavLink>
						<Typography color="textPrimary">{post.title}</Typography>
					</Breadcrumbs>
					<Paper className={classes.paper}>
						<Typography variant="h4">{post.title}</Typography>
						<Typography color="textSecondary" gutterBottom>
							{formatDateTime(
								post.updatedAt ? post.updatedAt : post.createdAt,
								'datetime'
							)}{' '}
							- Author: {post.author}
						</Typography>
						<Typography
							variant="body1"
							component="p"
							style={{ marginTop: 20 }}
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
						<div className={classes.rating}>
							<Rating
								name="hover-feedback"
								value={value}
								precision={0.5}
								onChange={(_, newValue) => {
									console.log(newValue);
									setValue(newValue);
								}}
								onChangeActive={(_, newHover) => {
									setHover(newHover);
								}}
							/>
							{value && (
								<Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
							)}
						</div>
					</Paper>
					<Paper className={classes.paper}>
						<Typography variant="h4" gutterBottom>
							Những bài viết liên quan
						</Typography>
						<Grid container spacing={2}>
							{postsRelated &&
								postsRelated.map(
									(p: PostField) =>
										p._id !== post._id && <RelatedPosts key={p._id} post={p} />
								)}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	) : null;
};

const useStyles = makeStyles((theme: Theme) => ({
	box: {
		padding: theme.spacing(8),
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(10),
	},
	paper: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(8),
		paddingTop: theme.spacing(2),
	},
	rating: {
		width: 200,
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(5),
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default PostDetail;
