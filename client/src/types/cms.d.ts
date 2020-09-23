type CategoriesResponse = {
	categories: Array<CategoryField>;
} & PaginationType;

type PostsResponse = {
	posts: Array<PostField>;
} & PaginationType;

type responseCategories = AxiosResponse & CategoriesResponse;
type responsePosts = AxiosResponse & PostsResponse;

type responsePost = AxiosResponse & PostField;
type responseCategory = AxiosResponse & CategoryField;

interface PostField {
	_id: string;
	title: string;
	content: string;
	category: string;
	slug: string;
	author?: string;
	view?: number;
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
