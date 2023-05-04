import { getListQuery } from '$lib/pocketbase.js';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const list = await getListQuery(params.listId);
		if (locals.user?.id === list.user) {
			return { list };
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const actions: Actions = {
	updateList: async ({ request, locals, params }) => {
		const values = await request.formData();
		const name = values.get('name') as string;
		const isTemplate = values.has('isTemplate');
		const { listId } = params;
		if (!listId) return;

		try {
			await locals.pb.collection('lists').update(listId, { name, isTemplate });
		} catch (err) {
			console.error(err);
			throw err;
		}
		throw redirect(303, `/lists/${params.listId}`);
	},
	deleteList: async ({ locals, params }) => {
		const { listId } = params;
		if (!listId) return;
		try {
			await locals.pb.collection('lists').delete(listId);
		} catch (err) {
			console.error(err);
			throw err;
		}
		throw redirect(303, `/lists`);
	}
};
