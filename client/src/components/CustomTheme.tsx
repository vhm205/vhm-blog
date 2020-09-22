import React, { ReactNode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const themeDark = createMuiTheme({
	overrides: {
		MuiAppBar: {
			colorDefault: {
				backgroundColor: '#2d3436',
				color: 'white',
			},
		},
		MuiTypography: {
			h6: {
				fontWeight: 'bolder',
			},
		},
		MuiButton: {
			colorInherit: {
				color: 'red',
			},
		},
	},
});

const themeLight = createMuiTheme({
	overrides: {
		MuiAppBar: {
			colorDefault: {
				backgroundColor: '#ff7979',
				color: 'light',
			},
		},
	},
});

interface CustomThemeProps {
	children: ReactNode;
	themeType: 'dark' | 'light';
}

export const CustomTheme: React.FC<CustomThemeProps> = ({
	children,
	themeType = 'dark',
}) => (
	<ThemeProvider theme={themeType === 'dark' ? themeDark : themeLight}>
		{children}
	</ThemeProvider>
);
