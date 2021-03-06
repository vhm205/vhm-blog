import React, { useState, useEffect, ChangeEvent } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CmsAPI from '../../../services/cmsService';
import ToolBarTable from '../components/ToolBarTable';
import { Notify } from '../../../components';

interface ListCategoriesProps {
	handleEdit: (category: CategoryField) => void;
}

interface ColumnCategory {
	id: 'stt' | 'name' | 'slug' | 'date' | 'update' | 'edit';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
}

const columns: ColumnCategory[] = [
	{ id: 'stt', label: 'Stt', align: 'left', minWidth: 50 },
	{ id: 'name', label: 'Name', align: 'left', minWidth: 100 },
	{ id: 'slug', label: 'Slug', align: 'left', minWidth: 100 },
	{ id: 'date', label: 'Date Created', align: 'left', minWidth: 100 },
	{ id: 'update', label: 'Date Updated', align: 'left', minWidth: 100 },
	{ id: 'edit', label: 'Edit', align: 'left', minWidth: 30 },
];

const ListCategories: React.FC<ListCategoriesProps> = ({ handleEdit }) => {
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
			<ToolBarTable
				title="Categories"
				numSelected={numSelected}
				handleDelete={handleDelete}
				reloadData={getCategories}
			/>
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
									{new Date(category.createdAt as number).toLocaleString()}
								</TableCell>
								<TableCell align="left">
									{category.updatedAt &&
										new Date(category.updatedAt as number).toLocaleString()}
								</TableCell>
								<TableCell>
									<IconButton
										aria-label="edit"
										onClick={() => {
											handleEdit(category);
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
