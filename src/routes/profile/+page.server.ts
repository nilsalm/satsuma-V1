import { redirect, type Actions, fail } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	return {
		email: locals.pb.authStore.model.email,
		username: locals.pb.authStore.model.username,
		id: locals.pb.authStore.model.id
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const values = await request.formData();
		const uname = values.get('username') as string | null;
		const id = values.get('id') as string | null;

		if (!id || !uname) return;
		const username = uname.trim();

		try {
			await locals.pb.collection('users').update(id, { username });
		} catch (err) {
			return fail(400, { incorrect: true });
		}
		return { success: true };
	}
};
