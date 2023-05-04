export type BaseList = {
	name: string;
	isTemplate: boolean;
	user: string;
};
export type List = BaseList & {
	id: string;
};
