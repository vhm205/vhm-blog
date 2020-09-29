import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { formatToHumanTime } from '../../../../utils';

interface ReplyCommentProps {
	classes: any;
	comment: CommentField;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ comment, classes }) => {
	return (
		<Fragment>
			<ListItem alignItems="flex-start" style={{ marginLeft: 50 }}>
				<ListItemAvatar>
					<Avatar>C</Avatar>
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
					secondary={comment.content}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	);
};

export default ReplyComment;
