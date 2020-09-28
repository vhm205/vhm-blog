type CategoriesResponse = {
	categories: Array<CategoryField>;
} & PaginationType;

type PostsResponse = {
	posts: Array<PostField>;
} & PaginationType;

type CommentsResponse = {
	comments: Array<CommentField>;
} & PaginationType;

type responseCategories = AxiosResponse & CategoriesResponse;
type responsePosts = AxiosResponse & PostsResponse;
type responseComments = AxiosResponse & CommentsResponse;

type responsePost = AxiosResponse & PostField;
type responseCategory = AxiosResponse & CategoryField;
type responseComment = AxiosResponse & CommentField;

interface PostField {
	_id: string;
	title: string;
	content: string;
	category: string;
	slug: string;
	author?: string;
	view?: number;
	rating?: number;
	createdAt?: number;
	updatedAt?: number;
	message?: string;
}

interface CategoryField {
	_id: string;
	name: string;
	slug: string;
	parentId?: number;
	createdAt?: number;
	updatedAt?: number;
	message?: string;
}

interface CommentField {
	_id?: string;
	email: string;
	content: string;
	postId: string;
	reply?: string;
	createdAt?: number;
}
