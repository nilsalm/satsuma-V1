import type { PageLoad } from './$types';
import PocketBase from 'pocketbase';
import type { GetItem } from 'src/models/Item';
import type { Category } from 'src/models/Category';

export const load: PageLoad = async ({ params }) => {
	// const items = GetDummyShoppingList();

	const client = new PocketBase('http://127.0.0.1:8090');
	const itemsList = await client.records.getList('items', 1, 50, {
		filter: 'created >= "2022-01-01 00:00:00" && picked = false'
	});

	const categoriesList = await client.records.getList('categories', 1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"'
	});

	const userId = client.authStore.model?.id;
	console.log('Items', itemsList);

	const categories = categoriesList.items.map((c) => {
		return {
			id: c.id,
			name: c.name
		} as Category;
	});

	const items = itemsList.items.map((i) => {
		const cat = categories.find((cat) => cat.id === i.category);

		return {
			id: i.id,
			name: i.name,
			category: cat,
			addedBy: i.addedBy,
			picked: i.picked,
			quantity: i.quantity,
			unit: i.unit
		} as GetItem;
	});

	return {
		listId: params.listId,
		list: items,
		userId: userId,
		categories: categories
	};
};
