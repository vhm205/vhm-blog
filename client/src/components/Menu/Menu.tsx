import React, { useState } from 'react';
import menuStyle from '../../styles/menuStyle';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Menu: React.FC = () => {
	const classes = menuStyle();
	const [open, setOpen] = useState(false);

	const handleDrawerOpenClose = (open: boolean) => setOpen(open);

	return (
		<div className={classes.root}>
			<NavBar
				classes={classes}
				open={open}
				handleDrawerOpen={handleDrawerOpenClose}
			/>
			<SideBar
				classes={classes}
				open={open}
				handleDrawerClose={handleDrawerOpenClose}
			/>
			<div className={classes.toolbar} />
		</div>
	);
};

export default Menu;
