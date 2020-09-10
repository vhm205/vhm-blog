type CategoriesResponse = {
	categories: Array<CategoryField>;
} & PaginationType;

type PostsResponse = {
	posts: Array<PostField>;
} & PaginationType;

type responseCategories = AxiosResponse & CategoriesResponse;
type responsePosts = AxiosResponse & PostsResponse;

interface PostField {
	_id: string;
	title: string;
	content: string;
	category: string;
	slug: string;
	author?: string;
	createdAt?: number;
	message?: string;
}

interface CategoryField {
	_id: string;
	name: string;
	slug: string;
	parentId?: number;
	createdAt?: number;
	message?: string;
}
