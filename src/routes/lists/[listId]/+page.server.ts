import {
	getCategoriesQuery,
	getItemsInListQuery,
	getListQuery,
	getTemplatesQuery
} from '$lib/pocketbase';
import type { Actions } from './$types';

export const load = ({ params, url }) => {
	const getList = async (listId: string) => {
		try {
			return await getListQuery(listId);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getCategories = async () => {
		try {
			return await getCategoriesQuery();
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getItems = async (listId: string, showPicked: boolean) => {
		try {
			return await getItemsInListQuery(listId, showPicked);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getTemplates = async () => {
		try {
			return await getTemplatesQuery();
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	
	const listId = params.listId;
	const showPicked = url.searchParams.get('showPicked') === 'true' || false;

	return {
		list: getList(listId),
		categories: getCategories(),
		items: getItems(listId, showPicked),
		templates: getTemplates()
	};
};

export const actions: Actions = {
	setCategory: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const category = String(values.get('category'));
		try {
			await locals.pb.collection('items').update(id, { category });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	pickItem: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const picked = String(values.get('picked')) === "true";

		try {
			await locals.pb.collection('items').update(id, { picked });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	decreaseItem: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const quantity = Number(values.get('quantity'));

		try {
			await locals.pb.collection('items').update(id, { quantity });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	increaseItem: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const quantity = Number(values.get('quantity'));

		try {
			await locals.pb.collection('items').update(id, { quantity });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	createItem: async ({ locals, request }) => {
		const values = await request.formData();
		const name = String(values.get('name'));
		const list = String(values.get('list'));
		const category = String(values.get('category'));
		const quantity = 1; //Number(values.get('quantity'));
		const user = locals.user.id;
		const picked = false;

		const newItem = { name, list, category, quantity, user, picked };

		try {
			const existingItems = await locals.pb.collection('items').getList(1, 100, {
				filter: `created >= "2022-01-01 00:00:00" && name ~ "${name}" && picked = false && list = "${list}"`
			});

			if (
				existingItems.items.length > 0 &&
				existingItems.items[0].name.toLowerCase() === name.toLowerCase()
			) {
				const existingItem = existingItems.items[0];
				await locals.pb
					.collection('items')
					.update(existingItem.id, { quantity: existingItem.quantity + 1 });
			} else {
				await locals.pb.collection('items').create(newItem);
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	createCategory: async ({ locals, request }) => {
		const values = await request.formData();
		const name = String(values.get('name'));
		const user = locals.user.id;

		try {
			const cat = await locals.pb.collection('categories').create({ name, user });
			const id = cat.id;
			return { success: true, id, action: 'createCategory' };
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	addTemplateItemsToList: async ({ locals, request }) => {
		const values = await request.formData();
		const list = String(values.get('list'));
		const template = String(values.get('template'));

		try {
			const templateItems = (await locals.pb.collection('items').getList(1, 100, {
				filter: `created >= "2022-01-01 00:00:00" && picked = false && list = "${template}"`
			})) as {
				page: number;
				perPage: number;
				totalItems: number;
				totalPages: number;
				items: Array<{
					name: string;
					picked: boolean;
					user: string;
					list: string;
					category: string;
					quantity: number;
				}>;
			};

			for (const item of templateItems.items) {
				const existingItems = await locals.pb.collection('items').getList(1, 100, {
					filter: `created >= "2022-01-01 00:00:00" && name ~ "${item.name.toLowerCase()}" && picked = false && list = "${list}"`
				});

				if (existingItems.items.length > 0) {
					const existingItem = existingItems.items[0];
					await locals.pb
						.collection('items')
						.update(existingItem.id, { quantity: existingItem.quantity + item.quantity });
				} else {
					const newItem = {
						name: item.name,
						list: list,
						category: item.category,
						quantity: item.quantity,
						user: item.user,
						picked: false
					};
					await locals.pb.collection('items').create(newItem);
				}
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	}
};
