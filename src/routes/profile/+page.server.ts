import type { Category } from '$lib/models/Category';
import { getCategoriesQuery } from '$lib/pocketbase';
import { deepClone } from '$lib/util.js';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getCategories = async () => {
		try {
			const categories = getCategoriesQuery();
			return categories;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		email: locals.pb.authStore.model.email,
		username: locals.pb.authStore.model.username,
		categories: getCategories()
	};
};

export const actions: Actions = {
	deleteCategory: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		let page = 1;
		let totalPages = 1;

		try {
			while (page <= totalPages) {
				const itemsRecord = await locals.pb.collection('items').getList(1, 500, {
					filter: `category = '${id}'`
				});
				page = itemsRecord.page;
				totalPages = itemsRecord.totalPages;

				if (itemsRecord.items.length > 0) {
					await Promise.all(
						itemsRecord.items.map(
							async (item) => await locals.pb.collection('items').delete(item.id)
						)
					);
				}
			}
			await locals.pb.collection('categories').delete(id);
		} catch (e) {
			console.error(e);
			return { success: false, error: e };
		}
		return { success: true };
	}
};
