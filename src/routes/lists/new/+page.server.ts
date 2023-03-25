import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const values = await request.formData();
		const name = values.get('name') as string;
		const isTemplate = values.has('isTemplate');
		const user = locals.user?.id;

		try {
			await locals.pb.collection('lists').create({ name, isTemplate, user });
		} catch (err) {
			console.error(err);
			throw err;
		}
		throw redirect(303, '/lists');
	}
};
