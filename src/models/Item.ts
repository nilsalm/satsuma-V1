import type { Category } from './Category';

export type Item = {
	id: string;
	name: string;
	category: Category | undefined | string;
	addedBy: string | undefined;
	picked: boolean;
	quantity: number;
	unit: 'piece' | 'package' | 'kg' | 'gramm';
};
