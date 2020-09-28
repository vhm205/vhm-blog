import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { formatToHumanTime } from '../../../utils';

interface ShowCommentProps {
	comment: CommentField;
}

const ShowComment: React.FC<ShowCommentProps> = ({ comment }) => {
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
							<span style={{ opacity: '.5', fontSize: 14 }}>
								- {formatToHumanTime(comment.createdAt)}
							</span>
						</Fragment>
					}
					secondary={
						<Fragment>
							<span style={{ display: 'block', marginBottom: 3 }}>
								{comment.content}
							</span>
							<Button color="primary" variant="outlined" size="small">
								Reply
							</Button>
						</Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	);
};

export default ShowComment;
