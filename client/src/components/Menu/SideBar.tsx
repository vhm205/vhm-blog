import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAdd from '@material-ui/icons/PostAdd';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils';

interface SideBarProps {
	classes: any;
	open: boolean;
	handleDrawerClose: (open: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = React.memo(
	({ classes, open, handleDrawerClose }) => {
		const theme = useTheme();
		const history = useHistory();

		return (
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={() => handleDrawerClose(false)}>
						{theme.direction !== 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={() => history.push('/all-posts')}>
						<ListItemIcon>
							<AllInclusiveIcon />
						</ListItemIcon>
						<ListItemText primary="All Posts" />
					</ListItem>
					<ListItem button onClick={() => history.push('/add-post')}>
						<ListItemIcon>
							<PostAdd />
						</ListItemIcon>
						<ListItemText primary="Add Post" />
					</ListItem>
					<ListItem button onClick={() => history.push('/category')}>
						<ListItemIcon>
							<AddCircleOutline />
						</ListItemIcon>
						<ListItemText primary="Add Category" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button onClick={logout}>
						<ListItemIcon>
							<ExitToApp />
						</ListItemIcon>
						<ListItemText primary="Log out" />
					</ListItem>
				</List>
			</Drawer>
		);
	}
);

export default SideBar;
