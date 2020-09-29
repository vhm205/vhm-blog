import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { formatDateTime, formatHtmlToText } from '../../../../utils';

interface PostProps {
	post: PostField;
	color: string;
}

const Post: React.FC<PostProps> = ({ color, post }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{post.author}
				</Typography>
				<Typography variant="h5" component="h2">
					<NavLink
						to={`/${post.category}/${post.slug}-${post._id}`}
						style={{ color }}
					>
						{post.title}
					</NavLink>
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					{formatDateTime(post.updatedAt ? post.updatedAt : post.createdAt)} -
					Lượt xem: {post.view}
				</Typography>
				<Typography variant="body2" component="p" noWrap={false}>
					{formatHtmlToText(post.content)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="medium"
					color="primary"
					component={NavLink}
					to={`/${post.category}/${post.slug}-${post._id}`}
				>
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
