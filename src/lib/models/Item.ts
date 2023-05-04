import type { User } from './User';
import type { List } from './List';
import type { Category } from './Category';

export type BaseItem = {
	name: string;
	quantity: number;
	picked: boolean;
	category: Category | string;
	list: List | string;
	user: User | string;
};

export type Item = BaseItem & {
	id: string;
};
