import { getListsQuery } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getLists = async () => {
		try {
			return getListsQuery();
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		lists: getLists()
	};
};
