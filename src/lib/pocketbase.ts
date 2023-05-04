import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { Item } from './models/Item';
import type { Category } from './models/Category';
import { deepClone } from './util';
import type { List } from './models/List';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

export async function getItemsInListQuery(listId: string) {
	const { items } = await pb.collection('items').getList<Item>(1, 100, {
		filter: `created >= "2022-01-01 00:00:00" && picked = false && list = "${listId}"`
	});
	return items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			picked: item.picked,
			quantity: item.quantity,
			category: item.category,
			list: item.list,
			user: item.user
		} as Item;
	});
}

export async function getCategoriesQuery() {
	const categories = deepClone(await pb.collection('categories').getFullList<Category>());
	return categories.map((category) => {
		return {
			id: category.id,
			name: category.name,
			user: category.user
		} as Category;
	});
}

export async function getListsQuery() {
	const lists = deepClone(
		await pb.collection('lists').getFullList<List>({
			filter: 'created >= "2022-01-01 00:00:00"'
		})
	);

	return lists.map((list) => {
		return {
			id: list.id,
			name: list.name,
			isTemplate: list.isTemplate,
			user: list.user
		} as List;
	});
}

export async function getTemplatesQuery() {
	const templates = deepClone(
		await pb.collection('lists').getFullList<List>({
			filter: 'created >= "2022-01-01 00:00:00" && isTemplate = true'
		})
	);
	return templates.map((template) => {
		return {
			id: template.id,
			name: template.name,
			isTemplate: template.isTemplate,
			user: template.user
		} as List;
	});
}

export async function getListQuery(listId: string) {
	const list = deepClone(await pb.collection('lists').getOne<List>(listId));
	return {
		id: list.id,
		name: list.name,
		isTemplate: list.isTemplate,
		user: list.user
	} as List;
}
