import {
	getMyCategoriesQuery,
	getItemsInListQuery,
	getListQuery,
	getTemplatesQuery,
	getCategoryQuery,
	createCategoryQuery
} from '$lib/pocketbase';
import type { Actions } from './$types';

export const load = async ({ params, url }) => {
	const getList = async (listId: string) => {
		try {
			return await getListQuery(listId);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getMyCategories = async () => {
		try {
			return await getMyCategoriesQuery();
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const getCategoriesSet = async (ids: (string | null)[]) => {
		// remove duplicates
		ids = [...new Set(ids)];

		const categories = await Promise.all(
			ids.map(async (id) => {
				if (!id) return;
				return await getCategoryQuery(id);
			})
		);

		return categories.sort((a, b) => a.order - b.order);
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

	const items = await getItems(listId, showPicked);

	const usedCategoriesIds = items.map((item) => item.category);

	const catSetList = await getCategoriesSet(usedCategoriesIds);
	const catSetOwn = await getMyCategories();

	const catSet = catSetList.concat(catSetOwn).filter((item) => item !== undefined);
	console.log(catSet);
	const catSetUnique = [...new Set(catSet.map((cat) => JSON.stringify(cat)))].map((cat) =>
		JSON.parse(cat)
	);

	console.log(catSetUnique);

	return {
		list: getList(listId),
		categories: catSetUnique,
		items,
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
	createItem: async ({ locals, request }) => {
		const values = await request.formData();
		var name = String(values.get('name'));
		const list = String(values.get('list'));
		const category = String(values.get('category'));
		var quantity = 1; //Number(values.get('quantity'));
		const picked = false;

		// if name starts with number, split it into quantity and name
		const nameMatch = name.match(/^(\d+)\s+(.*)$/);
		if (nameMatch) {
			quantity = Number(nameMatch[1]);
			name = nameMatch[2];
		}

		const newItem = { name, list, category, quantity, picked };

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
					.update(existingItem.id, { quantity: existingItem.quantity + quantity });
			} else {
				await locals.pb.collection('items').create(newItem);
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	createCategory: async ({ request }) => {
		const values = await request.formData();
		const name = String(values.get('name'));

		if (!name) return { success: false, error: 'No name provided' };

		try {
			const cat = await createCategoryQuery(name);
			const id = cat.id;
			return { success: true, id, action: 'createCategory' };
		} catch (e) {
			console.error(e);
			return { success: false, error: 'Could not create category' };
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
