import React, { ClassAttributes } from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextFieldProps } from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';

// type VariantTextFieldProps = 'filled' | 'standard' | 'outlined';
type TextBoxProps = FieldAttributes<{}> &
	ClassAttributes<HTMLInputElement> &
	TextFieldProps & {
		placeholder?: string;
		type?: string;
		disabled?: boolean;
		pattern?: RegExp | string;
	};

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
	({ placeholder, type, variant, disabled, pattern, ...props }, ref) => {
		const [field, meta] = useField<{}>(props);
		const errStr = meta.touched && meta.error;

		return (
			<TextField
				{...field}
				ref={ref}
				autoComplete="off"
				variant="outlined"
				type={type ? type : 'text'}
				style={{ marginTop: 10 }}
				disabled={disabled ? disabled : false}
				placeholder={placeholder}
				helperText={errStr}
				inputProps={pattern ? { pattern } : {}}
				error={!!errStr}
				fullWidth
			/>
		);
	}
);

export const CheckBoxWithLabel: React.FC<
	FieldAttributes<{}> & { label: string }
> = ({ label, ...props }) => {
	const [field] = useField<{}>(props);
	return (
		<FormControlLabel
			control={<Checkbox {...field} color="primary" />}
			label={label}
		/>
	);
};

export const RadioGroupWithLabel: React.FC<
	FieldAttributes<{}> & { label: string }
> = ({ label, children, ...props }) => {
	const [field] = useField<{}>(props);
	return (
		<FormControl component="fieldset" style={{ marginTop: 10 }}>
			<FormLabel component="legend">{label}</FormLabel>
			<RadioGroup {...field}>{children}</RadioGroup>
		</FormControl>
	);
};

export const Alert = (props: AlertProps) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const ComboBox = (data: Pick<CategoryField, 'name'>[]) => {
	return (
		<Autocomplete
			options={data}
			style={{ width: 300 }}
			renderInput={(params) => (
				<TextField {...params} label="Categories" variant="outlined" />
			)}
		/>
	);
};
