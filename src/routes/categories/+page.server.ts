import { getCategoriesQuery } from '$lib/pocketbase';
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
		categories: getCategories()
	};
};
