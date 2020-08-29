import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCommonStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	paper: {
		flexGrow: 1,
		padding: theme.spacing(8),
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(10),
	},
	btnSubmit: {
		marginTop: 10,
	},
}));
