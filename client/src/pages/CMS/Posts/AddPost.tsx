import React, { useState, useEffect, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import { TextBox } from '../../../components/CustomField';
import { Editor } from '@tinymce/tinymce-react';
import { Formik, Form, FormikValues, FormikErrors } from 'formik';
import { useCommonStyles } from '../../../styles/commonStyle';
import { handleErrors, slugify } from '../../../utils';
import { config } from '../../../config/app';
import CmsAPI from '../../../services/cmsService';

type CategoryName = Pick<CategoryField, 'name'>;

const initValues: PostField = {
	_id: '',
	title: '',
	content: '',
	category: '',
	slug: '',
};

const AddPost: React.FC = () => {
	const classes = useCommonStyles();
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [categories, setCategories] = useState<CategoryName[]>([]);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		try {
			const result: responseCategories = await CmsAPI.getAllCategories();
			setCategories(result.categories);
			setCategory(result.categories[0].name);
		} catch {}
	};

	const handleContentChange = (content: any) => setContent(content);

	const handleCategoryChange = (_: ChangeEvent<{}>, value: any) => {
		if (value) {
			setCategory(value.name);
		}
	};

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				validate={(values: FormikValues) => {
					const errors: FormikErrors<PostField> = {};
					if (
						!values.title ||
						values.title.length < 3 ||
						values.title.length > 100
					) {
						errors.title =
							"Title can't empty, at least 3 Character (Maximum 100)";
					}

					if (!content || content.length < 50) {
						errors.content = "Content can't empty, at least 50 Character";
					}

					if (!values.slug) {
						errors.slug = 'Slug is required';
					}

					if (!category) {
						errors.category = 'You need to choose a category for post';
					}

					return errors;
				}}
				onSubmit={async (values, { setStatus, resetForm }) => {
					try {
						const cms = new CmsAPI();
						await cms.addPost({
							title: values.title,
							slug: values.slug,
							content: content,
							category: category,
						});
						resetForm();
						setContent('');
						setStatus('A Post Created');
					} catch (error) {
						const message = handleErrors(error.response.data);
						setStatus(message ? message : 'An Error Occur in create a post');
					} finally {
						setTimeout(() => {
							setStatus('');
						}, 30000);
					}
				}}
			>
				{({
					errors,
					touched,
					status,
					handleSubmit,
					handleChange,
					isSubmitting,
					setFieldValue,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Typography variant="h5" style={{ marginTop: 30 }}>
							Add Post
						</Typography>
						<TextBox
							name="title"
							placeholder="Title..."
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								handleChange(e);
								setFieldValue('slug', slugify(e.currentTarget.value));
							}}
						/>
						<TextBox name="slug" placeholder="Slug..." disabled={true} />
						<Editor
							value={content}
							init={initEditor}
							apiKey={config.TINY_API_KEY}
							onEditorChange={handleContentChange}
						/>
						{categories.length && (
							<Autocomplete
								options={categories}
								getOptionLabel={(option) => option.name}
								style={{ width: 300, marginTop: 10, marginBottom: 10 }}
								loadingText="Loading..."
								defaultValue={{ name: categories[0].name }}
								onChange={handleCategoryChange}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Categories"
										variant="outlined"
									/>
								)}
							/>
						)}
						{errors.content && touched.content && (
							<Alert severity="error">{errors.content}</Alert>
						)}
						{errors.category && touched.category && (
							<Alert severity="error">{errors.category}</Alert>
						)}
						{status && <Alert severity="info">{status}</Alert>}
						<Button
							type="submit"
							disabled={isSubmitting}
							className={classes.btnSubmit}
							color="primary"
							variant="contained"
							fullWidth
						>
							Add New Post
						</Button>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

const initEditor = {
	height: 350,
	plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table paste code help wordcount',
	],
	toolbar:
		'undo redo | formatselect | bold italic backcolor | \
		alignleft aligncenter alignright alignjustify | \
		bullist numlist outdent indent | removeformat | help',
};

export default AddPost;
