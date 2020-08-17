import api from './api';

export default class UserAPI {
	path: string = '/users';

	constructor(token: string) {
		api.defaults.headers.common['authorization'] = `Bearer ${token}`;
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
}
