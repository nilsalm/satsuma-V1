import { getMyCategoriesQuery } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	const getCategories = async () => {
		try {
			const categories = getMyCategoriesQuery();
			return categories;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		categories: await getCategories()
	};
};
