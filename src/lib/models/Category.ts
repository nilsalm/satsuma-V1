export interface BaseCategory {
	name: string;
}
export interface Category extends BaseCategory {
	id: string;
	user: string;
}
