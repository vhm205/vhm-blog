import api from './api';
import cookie from 'react-cookies';

type DataProfile = Omit<User, 'id' | 'role' | 'local'>;
type DataLogin = Omit<LoginField, 'remember' | 'message'>;
type DataRegister = Omit<RegisterField, 'remember' | 'message'>;

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
	updateProfile(data: DataProfile) {
		return api.patch(`${this.path}/update-profile`, data);
	}
	static login(data: DataLogin) {
		return api.post('/users/login', data);
	}
	static register(data: DataRegister) {
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
