export type BaseUser = {
	username: string;
	name: string;
	email: string;
};
export type User = BaseUser & {
	id: string;
};
