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

	return {
		list: getList(params.listId),
		categories: getCategories(),
		items: getItems(params.listId)
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
	}
};
