import api from './api';
import { getToken } from '../utils';

type DataCategory = Omit<CategoryField, 'message'>;
type DataPost = Omit<PostField, 'message'>;

export default class CmsAPI {
	path: string = '/cms';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
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
	static getCategories(page: number) {
		return api.get(`/cms/all-categories/${page}`, {
			headers: {
				authorization: `Bearer ${getToken()}`,
			},
		});
	}
}
