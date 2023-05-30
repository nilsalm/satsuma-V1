import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (locals.user) {
			throw redirect(303, '/lists');
		}

		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
		};

		data.username = data.username.trim();

		try {
			await locals.pb.collection('users').authWithPassword(data.username, data.password);
		} catch (e) {
			return fail(400, { data, incorrect: true });
		}
		throw redirect(303, '/lists');
	}
};
