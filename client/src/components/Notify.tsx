import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from './CustomField';

interface NotifyProps {
	notify: NotificationType;
	autoHideDuration?: number;
	handleClose: () => void;
}

const Notify: React.FC<NotifyProps> = React.memo(
	({ notify, autoHideDuration, handleClose }) => {
		return (
			<Snackbar
				open={notify.open}
				autoHideDuration={autoHideDuration || 5000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={notify.type}>
					{notify.message}
				</Alert>
			</Snackbar>
		);
	}
);

export default Notify;
