import type { Category } from './Category';

type BaseItem = {
	name: string;
	picked: boolean;
	quantity: number;
	listId: string;
	unit: 'piece' | 'package' | 'kg' | 'gramm';
};

export type GetItem = BaseItem & {
	id: string;
	category: Category | undefined;
	owner: string | undefined;
};

export type PostItem = BaseItem & {
	category: string;
	owner: string;
};
