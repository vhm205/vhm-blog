import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Editor } from '@tinymce/tinymce-react';
import { Formik, Form } from 'formik';
import { TextBox, Alert } from '../../../components/CustomField';
import { useCommonStyles } from '../../../styles/commonStyle';
import { config } from '../../../config/app';

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
	const [content, setContent] = useState();
	const [notify, setNotify] = useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});

	const handleClose = (): void =>
		setNotify((prevValue: NotificationType) => ({ ...prevValue, open: false }));

	const handleContentChange = (content: any) => setContent(content);

	return (
		<Paper elevation={3} className={classes.paper}>
			<Formik
				initialValues={initValues}
				onSubmit={(values) => {
					console.log(values, content);
				}}
			>
				{({ values, handleSubmit, isSubmitting }) => (
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

export default AddPost;
