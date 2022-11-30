import type { PageLoad } from './$types';
import PocketBase from 'pocketbase';
import type { ShoppingList } from 'src/models/ShoppingList';

export const load: PageLoad = async ({ params }) => {
	const client = new PocketBase('http://127.0.0.1:8090');

	const listId = params.listId;
	// fetch a paginated records list
	const record = await client.records.getOne('shoppingLists', listId);
	const list: ShoppingList = {
		id: record.id,
		name: record.name,
		template: record.template,
		owner: record.owner
	};

	return { list: list };
};
