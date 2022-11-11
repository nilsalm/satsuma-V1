import type { Category } from './Category';

export type Item = {
	id: string;
	name: string;
	category: Category | undefined;
	addedBy: string | undefined;
	gotIt: boolean;
	quantity: number;
	unit: 'piece' | 'package' | 'kg' | 'gramm';
};
