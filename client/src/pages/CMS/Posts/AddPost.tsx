import React, { useState, useEffect, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Editor } from '@tinymce/tinymce-react';
import { Formik, Form } from 'formik';
import { TextBox } from '../../../components/CustomField';
import { useCommonStyles } from '../../../styles/commonStyle';
import { config } from '../../../config/app';
import CmsAPI from '../../../services/cmsService';

type CategoryName = Pick<CategoryField, 'name'>;

const initValues: PostField = {
	title: '',
	content: '',
	category: '',
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
		} catch {}
	};

	const handleContentChange = (content: any) => setContent(content);
	const handleCategoryChange = (e: ChangeEvent<{}>, value: CategoryName) => {
		console.log(e, value);
	};

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				onSubmit={(values) => {
					values.content = content;
					console.log(values);
				}}
			>
				{({ values, errors, handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<Typography variant="h5" style={{ marginTop: 30 }}>
							Add Post
						</Typography>
						<TextBox name="title" placeholder="Title..." />
						<Editor
							textareaName="content"
							init={initEditor}
							apiKey={config.TINY_API_KEY}
							onEditorChange={handleContentChange}
						/>
						<Autocomplete
							options={categories}
							getOptionLabel={(option) => option.name}
							style={{ width: 300, marginTop: 10 }}
							loadingText="Loading..."
							renderInput={(params) => (
								<TextField {...params} label="Categories" variant="outlined" />
							)}
						/>
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
						<pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

export default AddPost;
