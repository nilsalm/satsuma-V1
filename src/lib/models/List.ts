export interface BaseList {
	name: string;
	isTemplate: boolean;
}
export interface List extends BaseList {
	id: string;
	user: string;
}
