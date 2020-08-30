import React, { useState, useEffect, ChangeEvent } from 'react';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import CmsAPI from '../../../services/cmsService';

interface ListCategoriesProps {}

interface Column {
	id: 'stt' | 'name' | 'slug' | 'date';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
	{ id: 'stt', label: 'Stt', align: 'left', minWidth: 50 },
	{ id: 'name', label: 'Name', align: 'left', minWidth: 100 },
	{ id: 'slug', label: 'Slug', align: 'left', minWidth: 100 },
	{ id: 'date', label: 'Date Created', align: 'left', minWidth: 100 },
];

const ListCategories: React.FC<ListCategoriesProps> = React.memo(() => {
	const classes = useStyles();
	const [listId, setListId] = useState<string[]>([]);
	const [numSelected, setNumSelected] = useState<number>(0);
	const [pagination, setPagination] = useState<CategoriesResponse>({
		categories: [],
		page: 1,
		perPage: 5,
		total: 10,
	});

	useEffect(() => {
		(async () => {
			try {
				const result: responseCategories = await CmsAPI.getCategories(
					pagination.page
				);
				setPagination(result);
			} catch (error) {
				console.error(error, error.response, error.message);
			}
		})();
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
		let { value, checked } = event.target;
		let newListId: string[] = !checked
			? listId.filter((id) => id !== value)
			: [...listId, value];

		setNumSelected(newListId.length);
		setListId(newListId);
	};

	const handleDelete = () => {
		console.log(listId, numSelected);
		alert('Deleted');
	};

	return (
		<Paper className={classes.root}>
			<Toolbar style={{ flex: 1, justifyContent: 'space-between' }}>
				<Typography color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
				<Tooltip title="Delete">
					<IconButton aria-label="delete" onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
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
										<Checkbox indeterminate />
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{pagination.categories.map((category: CategoryField) => (
							<TableRow hover role="checkbox" key={category._id}>
								<TableCell align="left">
									<Checkbox value={category._id} onChange={handleChange} />
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
		</Paper>
	);
});

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
