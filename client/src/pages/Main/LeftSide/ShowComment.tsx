import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface ShowCommentProps {
	classes: any;
}

const ShowComment: React.FC<ShowCommentProps> = ({ classes }) => {
	return (
		<Fragment>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar>G</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<Fragment>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
			<ListItem alignItems="flex-start" style={{ marginLeft: 50 }}>
				<ListItemAvatar>
					<Avatar>G</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<Fragment>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	);
};

export default ShowComment;
