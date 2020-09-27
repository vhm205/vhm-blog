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
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

type TextBoxProps = FieldAttributes<{}> &
	ClassAttributes<HTMLInputElement> &
	TextFieldProps & {
		placeholder?: string;
		type?: string;
		style?: any;
		disabled?: boolean;
		pattern?: RegExp | string;
		multiline?: boolean;
		rows?: number;
		onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	};

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
	(
		{
			placeholder,
			type = 'text',
			style,
			variant,
			pattern,
			disabled = false,
			multiline = false,
			rows,
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
				multiline={multiline}
				rows={rows}
				placeholder={placeholder}
				helperText={errStr}
				error={!!errStr}
				style={{ marginTop: 10, ...style }}
				type={type}
				disabled={disabled}
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

export const Loading: React.FC<{ variants: TypographyProps['variant'][] }> = ({
	variants,
}) => {
	return (
		<div>
			{variants.map((variant) => (
				<Typography
					component="div"
					key={variant}
					variant={variant}
					gutterBottom
				>
					<Skeleton />
				</Typography>
			))}
		</div>
	);
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
