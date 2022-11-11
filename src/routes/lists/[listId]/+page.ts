import type { PageLoad } from './$types';
import { GetDummyShoppingList } from '../../../GetDummyShoppingList';

export const load: PageLoad = ({ params }) => {
	const items = GetDummyShoppingList();
	const categories = items.map((i) => {
		return i.category?.name;
	});
	return {
		listId: params.listId,
		list: items,
		categories: categories
	};
};
