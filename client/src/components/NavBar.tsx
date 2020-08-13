import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						VHM Blog
					</Typography>
					<Button
						className={classes.btnActive}
						color="primary"
						variant="contained"
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<Button
						className={classes.btnActive}
						color="primary"
						variant="contained"
						component={NavLink}
						to="/register"
					>
						Register
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	btnActive: {
		'&.active': {
			backgroundColor: '#303f9f',
		},
	},
}));

export default NavBar;
