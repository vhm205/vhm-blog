import React, { useState, useEffect, ChangeEvent } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ToolBarTable from '../components/ToolBarTable';
import Notify from '../../../components/Notify';
import CmsAPI from '../../../services/cmsService';
import { useCommonStyles } from '../../../styles/commonStyle';
import { RouteComponentProps } from 'react-router-dom';

interface ColumnPost {
	id: 'stt' | 'title' | 'slug' | 'date' | 'update' | 'edit';
	label: string;
	minWidth?: number;
	maxWidth?: number;
	align?: 'right' | 'left' | 'center';
}

const columns: ColumnPost[] = [
	{ id: 'stt', label: 'Stt', align: 'left', minWidth: 50 },
	{ id: 'title', label: 'Title', align: 'left', minWidth: 100 },
	{ id: 'slug', label: 'Slug', align: 'left', minWidth: 100 },
	{ id: 'date', label: 'Date Created', align: 'left', minWidth: 100 },
	{ id: 'update', label: 'Date Updated', align: 'left', minWidth: 100 },
	{ id: 'edit', label: 'Edit', align: 'left', minWidth: 30 },
];

const ListPosts: React.FC<RouteComponentProps> = ({ history }) => {
	const classes = useCommonStyles();
	const [listId, setListId] = useState<string[]>([]);
	const [numSelected, setNumSelected] = useState<number>(0);
	const [notify, setNotify] = useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});
	const [pagination, setPagination] = useState<PostsResponse>({
		posts: [],
		page: 1,
		perPage: 5,
		total: 10,
	});

	useEffect(() => {
		getPosts();
	}, [pagination.page]);

	const getPosts = React.useCallback(async () => {
		try {
			const result: responsePosts = await CmsAPI.getPosts(pagination.page);
			setPagination(result);
		} catch {}
	}, [pagination.page]);

	const handleChangePage = (_: unknown, newPage: number) => {
		setPagination((prevValue) => ({ ...prevValue, page: newPage + 1 }));
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setPagination((prevValue) => ({
			...prevValue,
			page: 1,
			perPage: +event.target.value,
		}));
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		const newListId: string[] = !checked
			? listId.filter((id) => id !== value)
			: [...listId, value];

		setNumSelected(newListId.length);
		setListId(newListId);
	};

	const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.checked) {
			const listId = pagination.posts.reduce(
				(arr: string[], value: PostField) => [...arr, value._id],
				[]
			);
			setNumSelected(listId.length);
			setListId(listId);
		} else {
			setNumSelected(0);
			setListId([]);
		}
	};

	const handleDelete = () => {
		Swal.fire({
			position: 'center',
			icon: 'question',
			title: 'Do you want to delete these posts?',
			backdrop: 'rgba(85,85,85, .4)',
			allowOutsideClick: true,
			showConfirmButton: true,
			showCancelButton: true,
		}).then(async (res: SweetAlertResult) => {
			if (!res.isConfirmed) return;

			try {
				await CmsAPI.deletePosts(listId);
				getPosts();

				setNumSelected(0);
				setListId([]);
				setNotify({
					open: true,
					type: 'success',
					message: 'Delete Successfully!',
				});
			} catch {}
		});
	};

	return (
		<Paper elevation={3} className={classes.paper}>
			<ToolBarTable
				title="Posts"
				numSelected={numSelected}
				handleDelete={handleDelete}
				reloadData={getPosts}
			/>
			<TableContainer style={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, fontWeight: 800 }}
								>
									{column.id !== 'stt' ? (
										column.label
									) : (
										<Checkbox
											indeterminate={
												numSelected > 0 && numSelected < pagination.posts.length
											}
											checked={numSelected === pagination.posts.length}
											onChange={handleCheckAll}
										/>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{pagination.posts.map((post: PostField) => (
							<TableRow hover role="checkbox" key={post._id}>
								<TableCell align="left">
									<Checkbox
										value={post._id}
										checked={listId.includes(post._id)}
										onChange={handleChange}
									/>
								</TableCell>
								<TableCell align="left">{post.title}</TableCell>
								<TableCell align="left">{post.slug}</TableCell>
								<TableCell align="left">
									{new Date(post.createdAt as number).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{post.updatedAt &&
										new Date(post.updatedAt as number).toLocaleString()}
								</TableCell>
								<TableCell>
									<IconButton
										aria-label="edit"
										onClick={() => {
											history.push(`/edit-post/${post._id}`);
										}}
									>
										<EditIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 50, 100]}
				component="div"
				count={pagination.total}
				rowsPerPage={pagination.perPage}
				page={pagination.page - 1}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			<Notify
				notify={notify}
				handleClose={() =>
					setNotify((prevValue: NotificationType) => ({
						...prevValue,
						open: false,
					}))
				}
			/>
		</Paper>
	);
};

export default ListPosts;
