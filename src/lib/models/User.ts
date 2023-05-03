export interface BaseUser {
	username: string;
	name: string;
	email: string;
}
export interface User extends BaseUser {
	id: string;
}
