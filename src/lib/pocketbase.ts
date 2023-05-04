import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { Item } from './models/Item';
import type { Category } from './models/Category';
import { deepClone } from './util';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

export async function getItemsQuery(listId: string) {
	const { items } = await pb.collection('items').getList<Item>(1, 100, {
		filter: `created >= "2022-01-01 00:00:00" && picked = false && list = "${listId}"`
	});
	return items;
}

export async function getCategoriesQuery() {
	const items = deepClone(await pb.collection('categories').getFullList<Category>());
	return items as Category[];
}
