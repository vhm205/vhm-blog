import api from './api';
import cookie from 'react-cookies';

export default class UserAPI {
	path: string = '/users';

	constructor(token?: string) {
		const tokenBearer = token ? token : cookie.load('token');
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	profile() {
		return api.get(`${this.path}/profile`);
	}
	static login(data: Omit<LoginField, 'remember' | 'message'>) {
		return api.post('/users/login', data);
	}
	static register(data: Omit<RegisterField, 'remember' | 'message'>) {
		return api.post('/users/register', data);
	}
	static logout(refreshToken: string) {
		return api.delete('/users/logout', {
			headers: {
				authorization: `Bearer ${refreshToken}`,
			},
		});
	}
}
