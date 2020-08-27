import { createGlobalStyle } from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Inconsolata';
		font-style: normal;
		font-weight: 400;
		font-stretch: normal;
		src: url(https://fonts.gstatic.com/s/inconsolata/v20/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WR32kg.ttf)
			format('truetype');
	}
	* {
		padding: 0;
		margin: 0;		
	}
	
	html {
		min-height: 100%;
	}

	a {
		text-decoration: none !important;
	}
`;

export const useCommonStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));
