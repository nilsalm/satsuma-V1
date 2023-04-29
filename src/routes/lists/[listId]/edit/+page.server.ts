import { error, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const list = JSON.parse(
			JSON.stringify(await locals.pb.collection('lists').getOne(params.listId))
		) as {
			id: string;
			name: string;
			isTemplate: boolean;
			user: string;
		};

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

		try {
			await locals.pb.collection('lists').update(params.listId, { name, isTemplate });
		} catch (err) {
			console.error(err);
			throw err;
		}
		throw redirect(303, `/lists/${params.listId}`);
	},
	deleteList: async ({ locals, params }) => {
		try {
			await locals.pb.collection('lists').delete(params.listId);
		} catch (err) {
			console.error(err);
			throw err;
		}
		throw redirect(303, `/lists`);
	}
};
