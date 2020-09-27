import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { commentSchema } from '../../../validations/main';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextBox } from '../../../components/CustomField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ShowComment from './ShowComment';
import MainAPI from '../../../services/mainService';

interface CommentProps {
	postId: string;
}

const initValues: CommentField = {
	email: '',
	content: '',
	postId: '',
};

const Comment: React.FC<CommentProps> = React.memo(({ postId }) => {
	const classes = useStyles();
	const [comment, setComment] = useState<CommentField>();

	return (
		<div>
			<Formik
				initialValues={initValues}
				validationSchema={commentSchema}
				onSubmit={async (values, { resetForm }) => {
					try {
						values.postId = postId;
						await MainAPI.addComment(values);
						setComment(values);
						resetForm();
					} catch (error) {
						console.error(error, error.response);
					}
				}}
			>
				{({ handleSubmit, handleChange, isSubmitting }) => (
					<Form onSubmit={handleSubmit} className={classes.root}>
						<TextBox name="email" placeholder="Your email" />
						<TextBox
							placeholder="Your comment"
							name="content"
							multiline
							rows={5}
							style={{ marginTop: 10 }}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={isSubmitting}
							className={classes.button}
							onChange={handleChange}
						>
							Send
						</Button>
					</Form>
				)}
			</Formik>
			<List className={classes.root}>
				<ShowComment classes={classes} />
			</List>
		</div>
	);
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(2),
	},
	listRoot: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
	textArea: {
		border: 'none',
		borderBottom: '1px solid black',
	},
	button: {
		marginTop: theme.spacing(1),
		maxWidth: 200,
		// alignSelf: 'flex-start',
	},
	inline: {
		display: 'inline',
	},
}));

export default Comment;
