import { AppBarProps } from '@material-ui/core/AppBar';

interface ConfigType {
	API_URL: string;
	TINY_API_KEY: string;
	initEditor: any;
	color: string | AppBarProps;
}

export const config: ConfigType = {
	API_URL: 'http://localhost:1002',
	TINY_API_KEY: 'mnhe8mkhfadk24d7pbtvd880370fc3jyxr34fxx0csiks0gt',
	initEditor: {
		height: 350,
		plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code help wordcount',
		],
		toolbar:
			'undo redo | formatselect | bold italic backcolor | \
			alignleft aligncenter alignright alignjustify | \
			bullist numlist outdent indent | removeformat | help',
	},
	color: 'primary',
};
