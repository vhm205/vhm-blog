import React, { useState, Suspense, lazy } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useCommonStyles } from '../../../styles/commonStyle';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';

const ListCategories = lazy(() => import('./ListCategories'));

const Category: React.FC = () => {
	const classes = useCommonStyles();
	const [category, setCategory] = useState<CategoryField | null>();

	const handleEdit = (category: CategoryField) => setCategory(category);
	const handleHideEditForm = () => setCategory(null);

	return (
		<Paper elevation={3} className={classes.paper}>
			<Grid container spacing={6}>
				<Grid item sm={4} xs={12}>
					<AddCategory />
					{category && (
						<EditCategory category={category} hideForm={handleHideEditForm} />
					)}
				</Grid>
				<Grid item sm={8} xs={12}>
					<Suspense fallback={<h1>Loading...</h1>}>
						<ListCategories handleEdit={handleEdit} />
					</Suspense>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Category;
