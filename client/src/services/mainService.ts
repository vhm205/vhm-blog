import api from './api';
import { getToken } from '../utils';

type DataComment = Omit<CommentField, '_id' | 'postId'>;

export default class CmsAPI {
	path: string = '/main';

	constructor(token?: string) {
		const tokenBearer = token ? token : getToken();
		if (tokenBearer) {
			api.defaults.headers.common['authorization'] = `Bearer ${tokenBearer}`;
		}
	}
	static addComment(data: DataComment) {
		return api.post('/main/add-comment', data);
	}
}
