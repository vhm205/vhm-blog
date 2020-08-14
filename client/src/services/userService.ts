import api from './api';

export default class UserAPI {
	path: string;

	constructor() {
		this.path = '/users';
	}
	login(data: Omit<LoginField, 'remember'>) {
		return api.post(`${this.path}/login`, data);
	}
}
