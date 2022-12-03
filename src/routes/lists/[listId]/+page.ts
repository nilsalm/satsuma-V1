import type { PageLoad } from './$types';
import type { GetItem } from 'src/models/Item';
import type { Category } from 'src/models/Category';
import type { ShoppingList } from 'src/models/ShoppingList';
import { getPbClient } from '$lib/usePocketBase';

export const load: PageLoad = async ({ params }) => {
	const pb = getPbClient();

	const currentListId = params.listId;

	const itemsList = await pb.collection('items').getList(1, 50, {
		filter: `created >= "2022-01-01 00:00:00" && picked = false && listId = "${currentListId}"`
	});

	const categoriesList = await pb.collection('categories').getList(1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"'
	});

	const templatesList = await pb.collection('shoppingLists').getList(1, 50, {
		filter: 'created >= "2022-01-01 00:00:00" && template = true'
	});

	const userId = pb.authStore.model?.id;

	const categories = categoriesList.items.map((c) => {
		return {
			id: c.id,
			name: c.name
		} as Category;
	});

	const templates = templatesList.items.map((t) => {
		return {
			id: t.id,
			name: t.name,
			template: t.template,
			owner: t.owner
		} as ShoppingList;
	});

	const items = itemsList.items.map((i) => {
		const cat = categories.find((cat) => cat.id === i.category);

		return {
			id: i.id,
			name: i.name,
			category: cat,
			owner: i.owner,
			picked: i.picked,
			quantity: i.quantity,
			unit: i.unit
		} as GetItem;
	});

	return {
		listId: currentListId,
		list: items,
		userId: userId,
		categories: categories,
		templates: templates
	};
};
