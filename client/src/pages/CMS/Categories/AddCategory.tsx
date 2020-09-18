import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import { TextBox } from '../../../components/CustomField';
import { useCommonStyles } from '../../../styles/commonStyle';
import { slugify, handleErrors } from '../../../utils';
import { categorySchema } from '../../../validations/cms';
import Notify from '../../../components/Notify';
import CmsAPI from '../../../services/cmsService';

const initValues: Omit<CategoryField, '_id'> = {
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
		<Formik
			initialValues={initValues}
			validationSchema={categorySchema}
			onSubmit={async (values, { resetForm }) => {
				try {
					const cms = new CmsAPI();
					values.slug = slugify(values.name);

					const result: responseWithMessage = await cms.addCategory(values);
					resetForm();
					setNotify({
						type: 'success',
						message: result.message,
						open: true,
					});
				} catch (error) {
					const { data } = error.response;
					const message = handleErrors(data);

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
						Add Category
					</Button>
					<Notify notify={notify} handleClose={handleClose} />
				</Form>
			)}
		</Formik>
	);
};

export default AddCategory;
