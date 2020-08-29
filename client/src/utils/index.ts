import { RefObject } from 'react';
import UserAPI from '../services/userService';
import cookie from 'react-cookies';

export const isAuthenticated = !!(
	cookie.load('token') && cookie.load('refreshToken')
);

export const checkSocialAccount = (user: User) => {
	return !!user.google || !!user.facebook;
};

export const logout = () => {
	console.log(isAuthenticated);

	if (isAuthenticated) {
		UserAPI.logout(cookie.load('refreshToken')).then(() => {
			cookie.remove('token');
			cookie.remove('refreshToken');
		});
	}
};

export const showPreviewAvatar = (
	file: File,
	thumb: RefObject<HTMLImageElement>
) => {
	const reader = new FileReader();
	reader.onloadend = () => {
		if (thumb.current) {
			thumb.current.src = reader.result as string;
		}
	};
	reader.readAsDataURL(file);
};

export const validImage = (file: File): { status: string; message: string } => {
	const typeValid = [
		'image/png',
		'image/jpg',
		'image/jpeg',
		'image/bmp',
		'image/gif',
	];

	if (!typeValid.includes(file.type)) {
		return {
			status: 'error',
			message: 'The file is not in the correct format',
		};
	}

	if (file.size > 1048576) {
		return {
			status: 'error',
			message: 'File not larger than 1 MB',
		};
	}

	return {
		status: 'success',
		message: 'ok',
	};
};

export const handleErrors = (errors: ErrorType) => {
	let message = '';
	if ('message' in errors) {
		message = errors.message;
	} else {
		message = errors.errors[0];
	}

	return message;
};

export const slugify = (text: string, separator: string = '-') =>
	text
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, separator);
