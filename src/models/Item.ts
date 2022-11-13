import type { Category } from './Category';

type BaseItem = {
	id?: string;
	name: string;
	picked: boolean;
	quantity: number;
	listId: string;
	unit: 'piece' | 'package' | 'kg' | 'gramm';
};

export type GetItem = BaseItem & {
	category: Category | undefined;
	addedBy: string | undefined;
};

export type PostItem = BaseItem & {
	category: string;
	addedBy: string;
};
