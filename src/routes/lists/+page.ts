import type { PageLoad } from './$types';
import type { ShoppingList } from 'src/models/ShoppingList';
import { getPbClient } from '$lib/usePocketBase';

export const load: PageLoad = async ({ params }) => {
	const pb = getPbClient();

	// fetch a paginated records list
	const resultList = await pb.collection('shoppingLists').getList(1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"'
	});

	const lists = resultList.items.map((l) => {
		return {
			id: l.id,
			name: l.name || '',
			template: l.template || false,
			owner: l.owner
		} as ShoppingList;
	});

	return { lists: lists };
};
