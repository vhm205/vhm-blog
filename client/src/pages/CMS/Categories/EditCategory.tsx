import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form } from 'formik';
import { categorySchema } from '../../../validations/cms';
import { TextBox } from '../../../components/CustomField';
import { Notify } from '../../../components';
import { slugify, handleErrors } from '../../../utils';
import { useCommonStyles } from '../../../styles/commonStyle';
import CmsAPI from '../../../services/cmsService';

interface EditCategoryProps {
	category: CategoryField;
	hideForm: () => void;
}

let initValues: Omit<CategoryField, '_id'> = {
	name: '',
	slug: '',
};

const EditCategory: React.FC<EditCategoryProps> = ({ category, hideForm }) => {
	const classes = useCommonStyles();
	const [notify, setNotify] = React.useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});

	initValues = category;

	React.useEffect(() => {
		initValues = category;
	}, [category]);

	const handleClose = (): void =>
		setNotify((prevValue: NotificationType) => ({ ...prevValue, open: false }));

	return (
		<Formik
			enableReinitialize={true}
			initialValues={initValues}
			validationSchema={categorySchema}
			onSubmit={async (values) => {
				try {
					await CmsAPI.updateCategory({
						id: category._id,
						name: values.name,
						slug: slugify(values.name),
					});
					setNotify({
						type: 'success',
						message: 'Update Successfully!',
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
			{({ isSubmitting, handleSubmit }) => (
				<Card style={{ marginTop: 50 }}>
					<CardHeader
						action={
							<IconButton aria-label="close" onClick={hideForm}>
								<CloseIcon />
							</IconButton>
						}
						title="Edit Category"
					/>
					<CardContent>
						<Form onSubmit={handleSubmit}>
							<TextBox
								name="name"
								placeholder="Name..."
								style={{ marginTop: -20 }}
							/>
							<TextBox type="hidden" name="slug" />
							<Button
								type="submit"
								disabled={isSubmitting}
								className={classes.btnSubmit}
								color="primary"
								variant="contained"
								fullWidth
							>
								Update Category
							</Button>
							<Notify notify={notify} handleClose={handleClose} />
						</Form>
					</CardContent>
				</Card>
			)}
		</Formik>
	);
};

export default EditCategory;
