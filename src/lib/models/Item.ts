import type { User } from './User';
import type { List } from './List';
import type { Category } from './Category';

export interface BaseItem {
	name: string;
	quantity: number;
	picked: boolean;
	category: Category;
	list: List;
	user: User;
}

export interface Item extends BaseItem {
	id: string;
}
