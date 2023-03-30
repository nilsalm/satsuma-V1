import type { Actions } from './$types';

export const load = ({ locals, params }) => {
	const getList = async (listId: string) => {
		try {
			const list = structuredClone(await locals.pb.collection('lists').getOne(listId)) as {
				id: string;
				name: string;
				isTemplate: boolean;
				user: string;
			};
			return list;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getCategories = async () => {
		try {
			const categories = structuredClone(
				await locals.pb.collection('categories').getFullList(undefined)
			) as Array<{
				id: string;
				name: string;
			}>;
			return categories;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getItems = async (listId: string) => {
		try {
			const listItems = structuredClone(
				await locals.pb.collection('items').getList(1, 100, {
					filter: `created >= "2022-01-01 00:00:00" && picked = false && list = "${listId}"`,
					expand: 'category'
				})
			) as {
				page: number;
				perPage: number;
				totalItems: number;
				totalPages: number;
				items: Array<{
					id: string;
					name: string;
					picked: boolean;
					user: string;
					list: string;
					category: string;
					quantity: number;
					expand: {
						id: string;
						name: string;
					};
				}>;
			};

			return listItems.items;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getTemplates = async () => {
		try {
			const templates = structuredClone(
				await locals.pb.collection('lists').getList(1, 100, {
					filter: `created >= "2022-01-01 00:00:00" && isTemplate = true`
				})
			) as {
				page: number;
				perPage: number;
				totalItems: number;
				totalPages: number;
				items: Array<{
					id: string;
					name: string;
					isTemplate: boolean;
					user: string;
				}>;
			};
			return templates.items;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		list: getList(params.listId),
		categories: getCategories(),
		items: getItems(params.listId),
		templates: getTemplates()
	};
};

export const actions: Actions = {
	updateItem: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const quantity = Number(values.get('quantity'));
		const picked = Boolean(values.has('picked'));

		try {
			await locals.pb.collection('items').update(id, { quantity, picked });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	pickItem: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		const picked = Boolean(values.has('picked'));

		try {
			await locals.pb.collection('items').update(id, { picked });
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
				filter: `created >= "2022-01-01 00:00:00" && name ~ "${name.toLowerCase()}" && picked = false && list = "${list}"`
			});

			if (existingItems.items.length > 0) {
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
			await locals.pb.collection('categories').create({ name, user });
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
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
					console.log(newItem);
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
