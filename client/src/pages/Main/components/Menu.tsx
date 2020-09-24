import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CmsAPI from '../../../services/cmsService';
import menuStyle from '../../../styles/menuStyle';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomTheme } from '../../../components/CustomTheme';

const Menu: React.FC = () => {
	const location = useLocation();
	const classes = menuStyle();
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

export default Menu;
