import api from './api';
import { getToken, setHeaderToken } from '../utils';

type DataCategory = Omit<CategoryField, 'message' | '_id'>;
type DataPost = Omit<PostField, 'message' | '_id'>;

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
	static getPosts(page: number) {
		return api.get(`/cms/get-posts/${page}`);
	}
	static getCategories(page: number) {
		return api.get(`/cms/get-categories/${page}`);
	}
	static getAllCategories() {
		return api.get('/cms/all-categories');
	}
	static deleteCategories(data: string[]) {
		return api.delete('/cms/delete-categories', {
			data: data,
		});
	}
}
