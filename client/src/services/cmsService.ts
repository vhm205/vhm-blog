import api from './api';
import { getToken } from '../utils';

type DataCategory = Omit<CategoryField, 'message' | '_id'>;
type DataPost = Omit<PostField, 'message' | '_id'>;
type DataRating = Pick<PostField, 'rating' | '_id'>;

export default class CmsAPI {
	static path: string = '/cms';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	addPost(data: DataPost) {
		return api.post(`${CmsAPI.path}/add-post`, data);
	}
	addCategory(data: DataCategory) {
		return api.post(`${CmsAPI.path}/add-category`, data);
	}
	static getPosts(page: number) {
		return api.get(`${CmsAPI.path}/get-posts/${page}`);
	}
	static getPostById(postId: string) {
		return api.get(`${CmsAPI.path}/get-post/${postId}`);
	}
	static getPostByCategory(page: number, category: string) {
		return api.get(`${CmsAPI.path}/get-posts-by-category/${category}/${page}`);
	}
	static getPostsRelated(category: string) {
		return api.get(`${CmsAPI.path}/get-posts-related/${category}`);
	}
	static updatePost(data: DataPost & { id: string }) {
		return api.patch(`${CmsAPI.path}/update-post`, data);
	}
	static updateRating(data: Partial<DataRating>) {
		return api.put(`${CmsAPI.path}/update-rating`, data);
	}
	static deletePosts(data: string[]) {
		return api.delete(`${CmsAPI.path}/delete-posts`, {
			data: data,
		});
	}
	static getCategories(page: number) {
		return api.get(`${CmsAPI.path}/get-categories/${page}`);
	}
	static getAllCategories() {
		return api.get(`${CmsAPI.path}/all-categories`);
	}
	static updateCategory(data: DataCategory & { id: string }) {
		return api.patch(`${CmsAPI.path}/update-category`, data);
	}
	static deleteCategories(data: string[]) {
		return api.delete(`${CmsAPI.path}/delete-categories`, {
			data: data,
		});
	}
}
