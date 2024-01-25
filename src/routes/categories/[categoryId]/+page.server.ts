import { deleteCategoryQuery, getCategoryQuery, getItemsPerCategory } from '$lib/pocketbase';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	const getCategory = async () => {
		try {
			const category = getCategoryQuery(params.categoryId);
			return category;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	const getItems = async () => {
		try {
			const items = getItemsPerCategory(params.categoryId);
			return items;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		category: getCategory(),
		items: getItems()
	};
};

export const actions: Actions = {
	updateCategory: async ({ request, locals, params }) => {
		const values = await request.formData();
		const name = values.get('name') as string | null;
		const { categoryId } = params;
		if (!categoryId) return;

		try {
			await locals.pb.collection('categories').update(categoryId, { name });
		} catch (err) {
			console.error(err);
			throw err;
		}
		redirect(303, `/categories/${params.categoryId}`);
	},
	deleteCategory: async ({ params }) => {
		const { categoryId } = params;
		if (!categoryId) return;
		deleteCategoryQuery(categoryId);
		redirect(303, '/categories');
	}
};
