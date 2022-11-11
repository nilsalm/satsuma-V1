import type { Item } from './Item';

export type ShoppingList = {
	id: string;
	created: Date;
	updated: Date;
	name: string | undefined;
	template: boolean;
	items: Item[];
};
