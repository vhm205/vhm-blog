import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CmsAPI from '../../services/cmsService';
import { NavLink, useLocation } from 'react-router-dom';

const ShowCategory: React.FC<{ classes: any }> = ({ classes }) => {
	const location = useLocation();
	const [categories, setCategories] = useState<CategoryField[]>();

	useEffect(() => {
		(async () => {
			try {
				const result: responseCategory = await CmsAPI.getAllCategories();
				setCategories(result.categories);
			} catch {}
		})();
	}, []);

	return categories &&
		location.pathname !== '/login' &&
		location.pathname !== '/register' ? (
		<div>
			{categories.map((category) => (
				<Button
					key={category._id}
					className={classes.btnActive}
					component={NavLink}
					variant="contained"
					color="inherit"
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
				color="inherit"
				variant="outlined"
				component={NavLink}
				to="/login"
			>
				Login
			</Button>
			<Button
				className={classes.btnActive}
				color="inherit"
				variant="outlined"
				component={NavLink}
				to="/register"
			>
				Register
			</Button>
		</div>
	);
};

export default ShowCategory;
