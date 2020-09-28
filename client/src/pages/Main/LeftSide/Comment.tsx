import React, { useState, useEffect, Fragment } from 'react';
import { Formik, Form } from 'formik';
import { commentSchema } from '../../../validations/main';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextBox } from '../../../components/CustomField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import ShowComment from './ShowComment';
import MainAPI from '../../../services/mainService';

const initValues: CommentField = {
	email: '',
	content: '',
	postId: '',
};

const Comment: React.FC<{ postId: string }> = React.memo(({ postId }) => {
	const classes = useStyles();
	const [pagination, setPagination] = useState<CommentsResponse>({
		comments: [],
		page: 1,
		perPage: 5,
		total: 0,
	});

	useEffect(() => {
		(async () => {
			try {
				const { page, perPage } = pagination;
				const result: responseComments = await (perPage !== -1
					? MainAPI.getCommentsByPostId(postId, page, perPage)
					: MainAPI.getAllComments(postId));
				setPagination(result);
			} catch {}
		})();
	}, [pagination.page, pagination.perPage]);

	const handleChangePage = (_: unknown, newPage: number) => {
		setPagination((prevValue) => ({ ...prevValue, page: newPage + 1 }));
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPagination((prevValue) => ({
			...prevValue,
			page: 1,
			perPage: +event.target.value,
		}));
	};

	return (
		<div>
			<Formik
				initialValues={initValues}
				validationSchema={commentSchema}
				onSubmit={async (values, { resetForm }) => {
					try {
						const { email, content } = values;
						const result: responseComment = await MainAPI.addComment({
							email: email,
							content: content,
							postId: postId,
						});
						setPagination((preValue) => ({
							...preValue,
							comments: [result.comment, ...pagination.comments],
						}));
						resetForm();
					} catch {}
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
				{pagination.comments.length > 0 && (
					<Fragment>
						{pagination.comments.map((comment) => (
							<ShowComment key={comment._id} comment={comment} />
						))}
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, 50, { value: -1, label: 'All' }]}
							component="div"
							count={pagination.total}
							rowsPerPage={pagination.perPage}
							page={pagination.page - 1}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Fragment>
				)}
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
