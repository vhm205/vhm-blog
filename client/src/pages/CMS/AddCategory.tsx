import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Formik, Form } from 'formik';
import { TextBox, Alert } from '../../components/CustomField';
import { useCommonStyles } from '../../styles/commonStyle';
import { slugify, handleErrors } from '../../utils';
import { categorySchema } from '../../validations/cms';
import CmsAPI from '../../services/cmsService';

const initValues: CategoryField = {
	name: '',
	slug: '',
};

const AddCategory: React.FC = () => {
	const classes = useCommonStyles();
	const [notify, setNotify] = useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});

	const handleClose = (): void =>
		setNotify((prevValue: NotificationType) => ({ ...prevValue, open: false }));

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				validationSchema={categorySchema}
				onSubmit={async (values) => {
					try {
						const cms = new CmsAPI();
						values.slug = slugify(values.name);

						const result: responseWithMessage = await cms.addCategory(values);
						setNotify({
							type: 'success',
							message: result.message,
							open: true,
						});
					} catch (error) {
						let { data } = error.response;
						let message = handleErrors(data);

						setNotify({
							type: 'error',
							message: message,
							open: true,
						});
					}
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<Typography variant="h5" style={{ marginTop: 30 }}>
							Add Category
						</Typography>
						<TextBox name="name" placeholder="Name..." />
						<TextBox type="hidden" name="slug" />
						<Button
							type="submit"
							disabled={isSubmitting}
							className={classes.btnSubmit}
							color="primary"
							variant="contained"
							fullWidth
						>
							Add New Category
						</Button>
						<Snackbar
							open={notify.open}
							autoHideDuration={5000}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						>
							<Alert onClose={handleClose} severity={notify.type}>
								{notify.message}
							</Alert>
						</Snackbar>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

export default AddCategory;
