import React, { ClassAttributes } from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

type TextBoxProps = FieldAttributes<{}> &
	ClassAttributes<HTMLInputElement> & { placeholder: string; type?: string };

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
	({ placeholder, type, ...props }, ref) => {
		const [field, meta] = useField<{}>(props);
		const errStr = meta.touched && meta.error;
		return (
			<TextField
				{...field}
				ref={ref}
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
