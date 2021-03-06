import api from './api';
import { getToken } from '../utils';

type DataComment = Omit<CommentField, '_id'>;

export default class CmsAPI {
	static path: string = '/main';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	static addComment(data: DataComment) {
		return api.post(`${CmsAPI.path}/add-comment`, data);
	}
	static getCommentsByPostId(postId: string, page: number, perPage: number) {
		return api.get(`${CmsAPI.path}/get-comments/${postId}/${perPage}/${page}`);
	}
	static getAllComments(postId: string) {
		return api.get(`${CmsAPI.path}/get-all-comments/${postId}`);
	}
	static getCommentsByReply(
		commentId: string,
		postId: string,
		listId: Array<string>,
		page: number
	) {
		return api.post(`${CmsAPI.path}/get-comments-by-reply`, {
			commentId,
			postId,
			listId,
			page,
		});
	}
	static updateComment(commentId: string, listId: Array<string>) {
		return api.patch(`${CmsAPI.path}/update-comment`, {
			listId,
			commentId,
		});
	}
}
