type CategoriesResponse = {
	categories: Array<CategoryField>;
	perPage: number;
	total: number;
	page: number;
};

type responseCategories = AxiosResponse & CategoriesResponse;

interface PostField {
	title: string;
	content: string;
	category: string;
	author?: string;
	message?: string;
}

interface CategoryField {
	_id?: string;
	name: string;
	slug: string;
	parentId?: number;
	createdAt?: number;
	message?: string;
}
