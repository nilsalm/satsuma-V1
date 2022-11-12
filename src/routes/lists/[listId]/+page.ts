import type { PageLoad } from './$types';
import PocketBase from 'pocketbase';
import type { Item } from 'src/models/Item';

export const load: PageLoad = async ({ params }) => {
	// const items = GetDummyShoppingList();

	const client = new PocketBase('http://127.0.0.1:8090');
	const resultList = await client.records.getList('items', 1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"'
	});

	console.log('Items', resultList);

	const items = resultList.items.map((i) => {
		return {
			id: i.id,
			name: i.name,
			category: i.category,
			addedBy: i.addedBy,
			picked: i.picked,
			quantity: i.quantity,
			unit: i.unit
		} as Item;
	});

	// const categories = items.map((i) => {
	// 	return i.category?.name;
	// });
	return {
		listId: params.listId,
		list: items
		// categories: categories
	};
};
