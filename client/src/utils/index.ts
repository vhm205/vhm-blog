import cookie from 'react-cookies';

export const isAuthenticated = !!(
	cookie.load('token') && cookie.load('refreshToken')
);
