import api from './api';
import { getToken, setHeaderToken } from '../utils';

type DataLogin = Omit<LoginField, 'remember' | 'message'>;
type DataRegister = Omit<RegisterField, 'remember' | 'message'>;

export default class UserAPI {
	path: string = '/users';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	profile() {
		return api.get(`${this.path}/profile`);
	}
	updateProfile(data: FormData) {
		return api.patch(`${this.path}/update-profile`, data);
	}
	static login(data: DataLogin) {
		return api.post('/users/login', data);
	}
	static register(data: DataRegister) {
		return api.post('/users/register', data);
	}
	static logout() {
		return api.delete('/users/logout', {
			headers: setHeaderToken(getToken('refresh-token')),
		});
	}
}
