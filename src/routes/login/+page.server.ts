import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (locals.user) {
			throw redirect(303, '/lists');
		}

		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};
		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			return fail(400, { data, incorrect: true });
		}
		throw redirect(303, '/lists');
	}
};
