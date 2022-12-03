import type { PageLoad } from './$types';
import type { ShoppingList } from 'src/models/ShoppingList';
import { getPbClient } from '$lib/usePocketBase';

export const load: PageLoad = async ({ params }) => {
	const pb = getPbClient();

	const listId = params.listId;
	// fetch a paginated records list
	const record = await pb.collection('shoppingLists').getOne(listId);
	const list: ShoppingList = {
		id: record.id,
		name: record.name,
		template: record.template,
		owner: record.owner
	};

	return { list: list };
};
