import React, { useState, useEffect, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swal, { SweetAlertResult } from 'sweetalert2';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import moment from 'moment';
import CmsAPI from '../../../services/cmsService';
import { Notify } from '../../../components';

const columns: ColumnCategory[] = [
	{ id: 'stt', label: 'Stt', align: 'left', minWidth: 50 },
	{ id: 'name', label: 'Name', align: 'left', minWidth: 100 },
	{ id: 'slug', label: 'Slug', align: 'left', minWidth: 100 },
	{ id: 'date', label: 'Date Created', align: 'left', minWidth: 100 },
];

const ListCategories: React.FC = () => {
	const classes = useStyles();
	const [listId, setListId] = useState<string[]>([]);
	const [numSelected, setNumSelected] = useState<number>(0);
	const [notify, setNotify] = useState<NotificationType>({
		type: '',
		message: '',
		open: false,
	});
	const [pagination, setPagination] = useState<CategoriesResponse>({
		categories: [],
		page: 1,
		perPage: 5,
		total: 10,
	});

	useEffect(() => {
		getCategories();
	}, [pagination.page]);

	const getCategories = async () => {
		try {
			const result: responseCategories = await CmsAPI.getCategories(
				pagination.page
			);
			setPagination(result);
		} catch {}
	};

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
			const listId = pagination.categories.reduce(
				(arr: string[], value: CategoryField) => [...arr, value._id],
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
			title: 'Do you want to delete these categories?',
			backdrop: 'rgba(85,85,85, .4)',
			allowOutsideClick: true,
			showConfirmButton: true,
			showCancelButton: true,
		}).then(async (res: SweetAlertResult) => {
			if (!res.isConfirmed) return;

			try {
				await CmsAPI.deleteCategories(listId);
				getCategories();

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
		<Paper className={classes.root}>
			<Toolbar style={{ flex: 1, justifyContent: 'space-between' }}>
				{numSelected > 0 ? (
					<>
						<Typography color="inherit" variant="subtitle1" component="div">
							{numSelected} selected
						</Typography>
						<Tooltip title="Delete">
							<IconButton aria-label="delete" onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</>
				) : (
					<>
						<Typography color="inherit" variant="h5" component="div">
							Categories
						</Typography>
						<Tooltip title="Reload">
							<IconButton aria-label="Reload" onClick={getCategories}>
								<ReplayIcon />
							</IconButton>
						</Tooltip>
					</>
				)}
			</Toolbar>
			<TableContainer className={classes.container}>
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
												numSelected > 0 &&
												numSelected < pagination.categories.length
											}
											checked={numSelected === pagination.categories.length}
											onChange={handleCheckAll}
										/>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{pagination.categories.map((category: CategoryField) => (
							<TableRow hover role="checkbox" key={category._id}>
								<TableCell align="left">
									<Checkbox
										value={category._id}
										checked={listId.includes(category._id)}
										onChange={handleChange}
									/>
								</TableCell>
								<TableCell align="left">{category.name}</TableCell>
								<TableCell align="left">{category.slug}</TableCell>
								<TableCell align="left">
									{moment(category.createdAt).format('LLL')}
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

const useStyles = makeStyles({
	root: {
		width: '100%',
		marginTop: 20,
	},
	container: {
		maxHeight: 440,
	},
});

export default ListCategories;
