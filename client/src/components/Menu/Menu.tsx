import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { isAuthenticated } from '../../utils';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './NavBar';
import SideBar from './SideBar';

const drawerWidth = 200;

const Menu: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleDrawerOpenClose = (open: boolean) => setOpen(open);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar
				classes={classes}
				open={open}
				isAuthenticated={isAuthenticated}
				handleDrawerOpen={handleDrawerOpenClose}
			/>
			{isAuthenticated ? (
				<SideBar
					classes={classes}
					open={open}
					handleDrawerClose={handleDrawerOpenClose}
				/>
			) : null}
			<div className={classes.toolbar} />
		</div>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(7) + 1,
			},
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		title: {
			flexGrow: 1,
		},
		btnActive: {
			'&.active': {
				backgroundColor: '#bcbbbb',
			},
		},
	})
);

export default Menu;
