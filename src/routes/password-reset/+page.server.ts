import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (locals.user) {
			throw redirect(303, '/lists');
		}

		const data = Object.fromEntries(await request.formData()) as {
			email: string;
		};

		data.email = data.email.trim();

		try {
			await locals.pb.admins.requestPasswordReset(data.email);
		} catch (e) {
      console.log(e)
			return fail(400, { data, incorrect: true });
		}
		
    return { success: true, email: data.email };
	}
};
