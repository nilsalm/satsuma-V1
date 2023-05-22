import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { Item } from './models/Item';
import type { Category } from './models/Category';
import { deepClone } from './util';
import type { List } from './models/List';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

export async function getItemsInListQuery(listId: string, picked: boolean = false) {
	const items = await pb.collection('items').getFullList<Item>({
		filter: `created >= "2022-01-01 00:00:00" && list = "${listId}" && picked = ${picked}`
	});
	return items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			picked: item.picked,
			quantity: item.quantity,
			category: item.category ? item.category : null,
			list: item.list,
			user: item.user
		} as Item;
	});
}

export async function getCategoryQuery(id: string) {
	const category = await pb.collection('categories').getOne<Category>(id);
	return {
		id: category.id,
		name: category.name,
		user: category.user
	} as Category;
}

export async function deleteCategoryQuery(id: string) {
	await pb.collection('categories').delete(id);
}

export async function getItemsPerCategory(id: string) {
	const items = await pb.collection('items').getFullList<Item>({
		filter: `created >= "2022-01-01 00:00:00" && category = "${id}"`
	});
	return items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			picked: item.picked,
			quantity: item.quantity,
			category: item.category ? item.category : null,
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

export async function deleteListAndAllItemsQuery(listId: string) {
	let page = 1;
	let totalPages = 1;
	try {
		while (page <= totalPages) {
			const itemsRecord = await pb.collection('items').getList(1, 500, {
				filter: `list = '${listId}'`
			});
			page = itemsRecord.page;
			totalPages = itemsRecord.totalPages;

			if (itemsRecord.items.length > 0) {
				await Promise.all(
					itemsRecord.items.map(async (item) => await pb.collection('items').delete(item.id))
				);
			}
		}
	} catch (e) {
		console.error(e);
		return { success: false, error: e };
	}
	await pb.collection('lists').delete(listId);
}

export async function deleteCategoryAndAllItemsQuery(categoryId: string) {
	let page = 1;
	let totalPages = 1;

	try {
		while (page <= totalPages) {
			const itemsRecord = await pb.collection('items').getList(1, 500, {
				filter: `category = '${categoryId}'`
			});
			page = itemsRecord.page;
			totalPages = itemsRecord.totalPages;

			if (itemsRecord.items.length > 0) {
				await Promise.all(
					itemsRecord.items.map(async (item) => await pb.collection('items').delete(item.id))
				);
			}
		}
	} catch (e) {
		console.error(e);
		return { success: false, error: e };
	}
	await pb.collection('categories').delete(categoryId);
}
