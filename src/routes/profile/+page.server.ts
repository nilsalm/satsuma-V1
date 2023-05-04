import { deleteCategoryAndAllItemsQuery, getCategoriesQuery } from '$lib/pocketbase';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getCategories = async () => {
		try {
			const categories = await getCategoriesQuery();
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
	deleteCategory: async ({ request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));
		await deleteCategoryAndAllItemsQuery(id);
		return { success: true };
	}
};
