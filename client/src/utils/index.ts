import { RefObject } from 'react';
import UserAPI from '../services/userService';
import cookie from 'react-cookies';
import moment from 'moment';

export const isAuthenticated = !!(
	cookie.load('token') && cookie.load('refreshToken')
);

export const checkSocialAccount = (user: User) => {
	return !!user.google || !!user.facebook;
};

export const getToken = (type: string = 'token') => {
	if (isAuthenticated) {
		switch (type) {
			case 'token':
				return cookie.load('token');
			case 'refresh-token':
				return cookie.load('refreshToken');
		}
	}

	return isAuthenticated;
};

export const setHeaderToken = (token: string) => {
	return {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
};

export const logout = async () => {
	if (isAuthenticated) {
		UserAPI.logout().then(() => {
			cookie.remove('token');
			cookie.remove('refreshToken');
			window.location.reload();
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

export const handleErrors = (errors: ErrorType) =>
	'message' in errors ? errors.message : errors.errors[0];

export const formatToHumanTime = (timestamp: number | undefined) => {
	if (!timestamp) return '';
	return moment(timestamp).locale('vi').startOf('seconds').fromNow();
};

export const getPosition = async () => {
	// async/await works in functions only (for now)
	const result = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
	const position = await result;
	console.log(position);
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
