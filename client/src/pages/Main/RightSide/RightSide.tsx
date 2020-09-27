import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface RightSideProps {}

const RightSide: React.FC<RightSideProps> = () => {
	const classes = useStyles();

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.which === 13) {
			console.log(e.currentTarget.value);
		}
	};

	return (
		<Paper className={classes.root}>
			<Paper component="form" elevation={1} className={classes.search}>
				<InputBase
					className={classes.input}
					placeholder="Search anything..."
					inputProps={{ 'aria-label': 'search posts' }}
					onKeyPress={handleSearch}
				/>
				<IconButton
					type="button"
					className={classes.iconButton}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</Paper>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		marginLeft: theme.spacing(3),
		padding: theme.spacing(5),
	},
	search: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

export default RightSide;
