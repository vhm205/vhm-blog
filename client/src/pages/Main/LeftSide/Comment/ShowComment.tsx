import React, { useState, useEffect, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';
import { formatToHumanTime } from '../../../../utils';
import MainAPI from '../../../../services/mainService';
import FormComment from './FormComment';
import ReplyComment from './ReplyComment';

interface ShowCommentProps {
	comment: CommentField;
	classes: any;
}

const ShowComment: React.FC<ShowCommentProps> = React.memo(
	({ comment, classes }) => {
		const [openComment, setOpenComment] = useState<boolean>(false);
		const [pagination, setPagination] = useState<CommentsResponse>({
			comments: [],
			page: 1,
			perPage: 5,
			total: 0,
		});

		useEffect(() => {
			(async () => {
				const { _id, postId, reply } = comment;
				if (reply?.length) {
					try {
						const result: responseComments = await MainAPI.getCommentsByReply(
							_id,
							postId,
							reply as string[],
							pagination.page
						);
						setPagination(result);
					} catch {}
				}
			})();
		}, [comment, pagination.page]);

		const handleSubmit = async (
			values: CommentField,
			{ resetForm }: FormikHelpers<CommentField>
		) => {
			try {
				const { _id, postId, reply } = comment;
				const { email, content } = values;
				const result: responseComment = await MainAPI.addComment({
					email: email,
					content: content,
					postId: postId,
					status: 'children',
				});
				await MainAPI.updateComment(_id, [
					...(reply as string[]),
					result.comment._id,
				]);

				setPagination((preValue) => ({
					...preValue,
					comments: [...pagination.comments, result.comment],
				}));
				resetForm();
			} finally {
				setOpenComment(!openComment);
			}
		};

		const handleReply = () => setOpenComment(!openComment);

		return (
			<Fragment>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar>G</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Fragment>
								{comment.email}{' '}
								<span className={classes.readerTitle}>
									- {formatToHumanTime(comment.createdAt)}
								</span>
							</Fragment>
						}
						secondary={
							<Fragment>
								<span className={classes.content}>{comment.content}</span>
								<Button
									color="primary"
									variant="outlined"
									size="small"
									onClick={handleReply}
								>
									Reply
								</Button>
							</Fragment>
						}
					/>
				</ListItem>
				<Typography gutterBottom component="div" className={classes.form}>
					{openComment && (
						<FormComment classes={classes} handleSubmit={handleSubmit} />
					)}
				</Typography>
				<Divider variant="inset" component="li" />
				{pagination.comments.length > 0 &&
					pagination.comments.map((cmt) => (
						<ReplyComment key={cmt._id} comment={cmt} classes={classes} />
					))}
			</Fragment>
		);
	}
);

export default ShowComment;
