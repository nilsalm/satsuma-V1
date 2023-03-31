import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

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

	return {
		categories: getCategories()
	};
};

export const actions: Actions = {
	deleteCategory: async ({ locals, request }) => {
		const values = await request.formData();
		const id = String(values.get('id'));

		console.log('id', id);

		try {
			await locals.pb.collection('categories').delete(id);
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	}
};
