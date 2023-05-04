export type BaseCategory = {
	name: string;
	user: string;
};
export type Category = BaseCategory & {
	id: string;
};
