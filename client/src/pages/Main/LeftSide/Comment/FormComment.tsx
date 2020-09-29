import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, FormikHelpers } from 'formik';
import { commentSchema } from '../../../../validations/main';
import { TextBox } from '../../../../components/CustomField';

interface FormCommentProps {
	classes: any;
	handleSubmit: (
		values: CommentField,
		formikHelper: FormikHelpers<CommentField>
	) => void;
}

const initValues: CommentField = {
	_id: '',
	email: '',
	content: '',
	postId: '',
};

const FormComment: React.FC<FormCommentProps> = React.memo(
	({ classes, handleSubmit }) => {
		return (
			<Formik
				initialValues={initValues}
				validationSchema={commentSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, isSubmitting }) => (
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
						>
							Send
						</Button>
					</Form>
				)}
			</Formik>
		);
	}
);

export default FormComment;
