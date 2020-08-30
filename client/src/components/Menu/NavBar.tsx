import React, { useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { config } from '../../config/app';
import { logout, checkSocialAccount } from '../../utils';

interface NavBarProps {
	classes: any;
	open: boolean;
	isAuthenticated: boolean;
	handleDrawerOpen: (open: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = React.memo(
	({ classes, open, isAuthenticated, handleDrawerOpen }) => {
		const profile = useUser();
		const [anchorEl, setAnchorEl] = useState(null);

		const handleMenu = (e: any) => setAnchorEl(e.currentTarget);
		const handleClose = () => setAnchorEl(null);

		return (
			<AppBar
				position="fixed"
				className={
					isAuthenticated
						? clsx(classes.appBar, {
								[classes.appBarShift]: open,
						  })
						: ''
				}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => handleDrawerOpen(true)}
						edge="start"
						className={
							isAuthenticated
								? clsx(classes.menuButton, {
										[classes.hide]: open,
								  })
								: ''
						}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
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
							{profile.user ? (
								<Fab variant="extended" color="default" onClick={handleMenu}>
									{profile.user.avatar ? (
										<Avatar
											alt="Avatar NavBar"
											src={
												checkSocialAccount(profile.user)
													? (profile.user.avatar as string)
													: `${config.API_URL}/images/${profile.user.avatar}`
											}
											style={{ marginRight: 10 }}
										/>
									) : (
										<AccountCircle
											fontSize="large"
											style={{ marginRight: 10 }}
										/>
									)}
									{profile.user?.username}
								</Fab>
							) : null}
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
								<MenuItem
									component={NavLink}
									to="/profile"
									onClick={() => setAnchorEl(null)}
								>
									Profile
								</MenuItem>
								<MenuItem onClick={logout}>Log out</MenuItem>
							</Menu>
						</>
					)}
				</Toolbar>
			</AppBar>
		);
	}
);

export default NavBar;
