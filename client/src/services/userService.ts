import api from './api';

export default class UserAPI {
	path: string = '/users';

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
		return api.get('/users/logout', {
			headers: {
				authorization: `Bearer ${refreshToken}`,
			},
		});
	}
}
