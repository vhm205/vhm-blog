import api from './api';
import { getToken, setHeaderToken } from '../utils';

type DataCategory = Omit<CategoryField, 'message' | '_id'>;
type DataPost = Omit<PostField, 'message'>;

export default class CmsAPI {
	path: string = '/cms';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	addPost(data: DataPost) {
		return api.post(`${this.path}/add-post`, data);
	}
	addCategory(data: DataCategory) {
		return api.post(`${this.path}/add-category`, data);
	}
	static deleteCategories(data: string[]) {
		return api.delete('/cms/delete-categories', {
			data: data,
			headers: setHeaderToken(getToken()),
		});
	}
	static getCategories(page: number) {
		return api.get(`/cms/get-categories/${page}`, {
			headers: setHeaderToken(getToken()),
		});
	}
	static getAllCategories() {
		return api.get('/cms/all-categories', {
			headers: setHeaderToken(getToken()),
		});
	}
}
