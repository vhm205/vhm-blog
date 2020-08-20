import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { isAuthenticated } from '../utils';
import { useUser } from '../context/UserContext';
import { config } from '../config/app';
import cookie from 'react-cookies';
import UserAPI from '../services/userService';

const NavBar: React.FC<RouteComponentProps> = ({ history }) => {
	const classes = useStyles();
	const profile = useUser();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	const handleLogout = () => {
		if (isAuthenticated) {
			UserAPI.logout(cookie.load('refreshToken')).then(() => {
				cookie.remove('token');
				cookie.remove('refreshToken');
				history.push('/login');
				window.location.reload();
			});
		}
		setAnchorEl(null);
	};

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
					{!isAuthenticated ? (
						<>
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
						</>
					) : (
						<>
							<Fab variant="extended" color="default" onClick={handleMenu}>
								{profile.user?.avatar ? (
									<Avatar
										alt="Avatar NavBar"
										src={`${config.API_URL}/images/${profile.user.avatar}`}
										style={{ marginRight: 10 }}
									/>
								) : (
									<AccountCircle fontSize="large" style={{ marginRight: 10 }} />
								)}
								{profile.user?.username}
							</Fab>
							<Menu
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={!!anchorEl}
								onClose={handleClose}
							>
								<MenuItem>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Log out</MenuItem>
							</Menu>
						</>
					)}
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

export default withRouter(NavBar);
