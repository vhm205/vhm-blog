import api from './api';
import cookie from 'react-cookies';

type DataCategory = Omit<CategoryField, 'message'>;
type DataPost = Omit<PostField, 'message'>;

export default class CmsAPI {
	path: string = '/cms';

	constructor(token?: string) {
		const tokenBearer = token ? token : cookie.load('token');
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	addCategory(data: DataCategory) {
		return api.post(`${this.path}/add-category`, data);
	}
	addPost(data: DataPost) {
		return api.post(`${this.path}/add-post`, data);
	}
}
