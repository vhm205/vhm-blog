import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

export const TextBox: React.FC<
	FieldAttributes<{}> & { placeholder: string; type?: string }
> = ({ placeholder, type, ...props }) => {
	const [field, meta] = useField<{}>(props);
	const errStr = meta.touched && meta.error;
	return (
		<TextField
			{...field}
			variant="outlined"
			autoComplete="off"
			type={type ? type : 'text'}
			style={{ marginTop: 10 }}
			placeholder={placeholder}
			helperText={errStr}
			error={!!errStr}
			fullWidth
		/>
	);
};

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
