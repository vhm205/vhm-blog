import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CmsAPI from '../../../services/cmsService';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomTheme } from '../../../components/CustomTheme';

const Menu: React.FC = () => {
	const location = useLocation();
	const classes = menuStyles();
	const [categories, setCategories] = useState<CategoryField[]>();

	useEffect(() => {
		(async () => {
			try {
				const result: responseCategory = await CmsAPI.getAllCategories();
				setCategories(result.categories);
			} catch {}
		})();
	}, []);

	return (
		<div className={classes.root}>
			<CustomTheme themeType="dark">
				<AppBar position="fixed" color="default">
					<Toolbar>
						<Typography variant="h6" noWrap className={classes.title}>
							VHM Blog
						</Typography>
						{categories &&
						location.pathname !== '/login' &&
						location.pathname !== '/register' ? (
							<div>
								{categories.map((category) => (
									<Button
										key={category._id}
										className={classes.btnActive}
										component={NavLink}
										variant="contained"
										color="primary"
										to={`/category/${category.name}`}
									>
										{category.name}
									</Button>
								))}
							</div>
						) : (
							<div>
								<Button
									className={classes.btnActive}
									component={NavLink}
									variant="contained"
									color="primary"
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
							</div>
						)}
					</Toolbar>
				</AppBar>
			</CustomTheme>
			<div className={classes.toolbar} />
		</div>
	);
};

const drawerWidth = 200;

export const menuStyles = makeStyles((theme: Theme) =>
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
			...theme.mixins.toolbar,
		},
		title: {
			flexGrow: 1,
		},
		btnActive: {
			'&.active': {
				// backgroundColor: '#bcbbbb',
				backgroundColor: '#303f9f',
			},
		},
	})
);

export default Menu;
