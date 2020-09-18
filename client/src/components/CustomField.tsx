import React, { ClassAttributes, ChangeEvent } from 'react';
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

type TextBoxProps = FieldAttributes<{}> &
	ClassAttributes<HTMLInputElement> &
	TextFieldProps & {
		placeholder?: string;
		type?: string;
		style?: any;
		disabled?: boolean;
		pattern?: RegExp | string;
		onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	};

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
	(
		{
			placeholder,
			type,
			style,
			variant,
			disabled,
			pattern,
			onChange,
			...props
		},
		ref
	) => {
		const [field, meta] = useField<{}>(props);
		const errStr = meta.touched && meta.error;

		return (
			<TextField
				{...field}
				ref={ref}
				autoComplete="off"
				variant="outlined"
				placeholder={placeholder}
				helperText={errStr}
				error={!!errStr}
				style={{ marginTop: 10, ...style }}
				type={type ? type : 'text'}
				disabled={disabled ? disabled : false}
				inputProps={pattern ? { pattern } : {}}
				onChange={onChange ? onChange : field.onChange}
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
