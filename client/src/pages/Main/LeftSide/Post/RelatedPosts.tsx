import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { formatHtmlToText, formatDateTime } from '../../../../utils';

interface RelatedPostsProps {
	post: PostField;
}

const RelatedPosts: React.FC<RelatedPostsProps> = React.memo(({ post }) => {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card>
				<CardActionArea
					onClick={() => {
						window.location.href = `/${post.category}/${post.slug}-${post._id}`;
					}}
				>
					<CardHeader
						title={post.title}
						subheader={formatDateTime(
							post.updatedAt ? post.updatedAt : post.createdAt
						)}
					/>
					<CardContent>
						<Typography variant="body2" component="p" noWrap={false}>
							{formatHtmlToText(post.content)}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
});

export default RelatedPosts;
