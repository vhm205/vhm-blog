import React from 'react';
import clsx from 'clsx';
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
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils';

interface SideBarProps {
	classes: any;
	open: boolean;
	handleDrawerClose: (open: boolean) => void;
}

const items: { title: string; url: string; children: JSX.Element }[] = [
	{ title: 'All Posts', url: '/all-posts', children: <AllInclusiveIcon /> },
	{ title: 'Add Post', url: '/add-post', children: <PostAdd /> },
	{ title: 'Add Category', url: '/category', children: <AddCircleOutline /> },
];

const Navigate: React.FC<{ url: string; title: string }> = ({
	url,
	title,
	children,
}) => {
	const history = useHistory();
	return (
		<ListItem button onClick={() => history.push(url)}>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={title} />
		</ListItem>
	);
};

const SideBar: React.FC<SideBarProps> = React.memo(
	({ classes, open, handleDrawerClose }) => {
		const theme = useTheme();

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
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{items.map((value) => (
						<Navigate key={value.url} title={value.title} url={value.url}>
							{value.children}
						</Navigate>
					))}
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
