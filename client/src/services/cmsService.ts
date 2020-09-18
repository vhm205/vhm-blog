import api from './api';
import { getToken } from '../utils';

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
	static getPostById(postId: string) {
		return api.get(`/cms/get-post/${postId}`);
	}
	static updatePost(data: DataPost & { id: string }) {
		return api.patch(`/cms/update-post`, data);
	}
	static deletePosts(data: string[]) {
		return api.delete('/cms/delete-posts', {
			data: data,
		});
	}
	static getCategories(page: number) {
		return api.get(`/cms/get-categories/${page}`);
	}
	static getAllCategories() {
		return api.get('/cms/all-categories');
	}
	static updateCategory(data: DataCategory & { id: string }) {
		return api.patch(`/cms/update-category`, data);
	}
	static deleteCategories(data: string[]) {
		return api.delete('/cms/delete-categories', {
			data: data,
		});
	}
}
