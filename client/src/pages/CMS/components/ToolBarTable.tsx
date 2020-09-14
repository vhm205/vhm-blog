import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';

interface ToolBarTableProps {
	title: string;
	numSelected: number;
	handleDelete: () => void;
	reloadData: () => void;
}

const ToolBarTable: React.FC<ToolBarTableProps> = ({
	title,
	numSelected,
	handleDelete,
	reloadData,
}) => {
	return (
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
						{title}
					</Typography>
					<Tooltip title="Reload">
						<IconButton aria-label="Reload" onClick={reloadData}>
							<ReplayIcon />
						</IconButton>
					</Tooltip>
				</>
			)}
		</Toolbar>
	);
};

export default ToolBarTable;
