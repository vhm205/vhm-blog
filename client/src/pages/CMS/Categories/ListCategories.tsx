import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

interface ListCategoriesProps {
	categories: CategoriesResponse | null;
}

interface Column {
	id: 'id' | 'name' | 'slug' | 'date';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
	{ id: 'id', label: 'Id', align: 'left', minWidth: 50 },
	{ id: 'name', label: 'Name', align: 'left', minWidth: 100 },
	{ id: 'slug', label: 'Slug', align: 'left', minWidth: 100 },
	{ id: 'date', label: 'Date Created', align: 'left', minWidth: 100 },
];

const ListCategories: React.FC<ListCategoriesProps> = React.memo(
	({ categories }) => {
		if (!categories) {
			return <div>Loading...</div>;
		}
		const classes = useStyles();
		const { total, page, perPage } = categories;
		const [pagination, setPagination] = useState<CategoriesResponse>({
			categories: categories.categories,
			page: page,
			perPage: perPage,
			total: total,
		});
		console.log(pagination);

		const handleChangePage = (_: unknown, newPage: number) => {
			setPagination((prevValue) => ({ ...prevValue, page: newPage }));
		};

		const handleChangeRowsPerPage = (
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			console.log(event.target.value);
			setPagination((prevValue) => ({
				...prevValue,
				page: 1,
				perPage: +event.target.value,
			}));
		};

		return (
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{pagination.categories.map(
								(category: CategoryField, index: number) => (
									<TableRow hover role="checkbox" key={category._id}>
										<TableCell align="left">{index + 1}</TableCell>
										<TableCell align="left">{category.name}</TableCell>
										<TableCell align="left">{category.slug}</TableCell>
										<TableCell align="left">
											{moment(category.createdAt).format('LLL')}
										</TableCell>
									</TableRow>
								)
							)}
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
	}
);

const useStyles = makeStyles({
	root: {
		width: '100%',
		marginTop: 20,
	},
	tableHeader: {
		fontWeight: 800,
	},
	container: {
		maxHeight: 440,
	},
});

export default ListCategories;
