import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import menuStyle from '../../styles/menuStyle';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Menu: React.FC = () => {
	const classes = menuStyle();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = (open: boolean) => setOpen(open);
	const handleDrawerClose = (open: boolean) => setOpen(open);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar
				classes={classes}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<SideBar
				classes={classes}
				open={open}
				handleDrawerClose={handleDrawerClose}
			/>
			<div className={classes.toolbar} />
		</div>
	);
};

export default Menu;
