import React, { useState, useEffect, Fragment } from 'react';
import { FormikHelpers } from 'formik';
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TablePagination from '@material-ui/core/TablePagination';
import MainAPI from '../../../../services/mainService';
import ShowComment from './ShowComment';
import FormComment from './FormComment';

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
	}, [pagination.page, pagination.perPage, postId]);

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

	const handleSubmit = async (
		values: CommentField,
		{ resetForm }: FormikHelpers<CommentField>
	) => {
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
	};

	return (
		<div>
			<FormComment classes={classes} handleSubmit={handleSubmit} />
			<List className={classes.root}>
				{pagination.comments.length > 0 && (
					<Fragment>
						{pagination.comments.map((comment) => (
							<ShowComment
								key={comment._id}
								comment={comment}
								classes={classes}
							/>
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
	},
	inline: {
		display: 'inline',
	},
	content: {
		display: 'block',
		marginBottom: theme.spacing(1),
	},
	readerTitle: {
		opacity: '.5',
		fontSize: 14,
	},
	form: {
		margin: theme.spacing(-2, 0, 2, 9),
	},
}));

export default Comment;
