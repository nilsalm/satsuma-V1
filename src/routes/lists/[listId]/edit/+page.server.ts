import type { User } from '$lib/models/User';
import {
	deleteListAndAllItemsQuery,
	getListQuery,
	getUserByUsernameOrEmailQuery,
	inviteUserToListQuery,
	removeGuestFromListQuery,
	updateListSharedWithBasedOnInvitationsQuery
} from '$lib/pocketbase.js';
import { error, redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		await updateListSharedWithBasedOnInvitationsQuery(params.listId);
	} catch (err) {
		console.error(err);
		throw err;
	}

	try {
		const list = await getListQuery(params.listId);
		if (locals.user?.id === list.owner) {
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
			return fail(400, { message: 'Error updating list' });
		}
		return { success: true, type: 'update' };
	},
	inviteUser: async ({ request, locals, params }) => {
		const values = await request.formData();
		const usernameEmail = values.get('usernameEmail') as string;
		const { listId } = params;
		if (!listId) return;

		const list = await getListQuery(listId);
		// find user
		let guest: User | undefined;
		try {
			guest = await getUserByUsernameOrEmailQuery(usernameEmail);
		} catch (err) {
			return fail(400, { message: 'Error finding user' });
		}

		if (!guest) return fail(400, { message: 'Error no user found' });
		if (!locals.user) return fail(400, { message: 'Error not logged in' });

		// create invitation
		try {
			await inviteUserToListQuery(locals.user.id, guest.id, listId, locals.user.username);
		} catch (err) {
			return fail(400, { message: 'Error inviting user' });
		}
		return { success: true, type: 'invitation', guest: guest.username };
	},
	removeGuest: async ({ request, params }) => {
		const values = await request.formData();
		const guest = values.get('guest') as string;
		const { listId } = params;
		if (!listId) return;

		try {
			await removeGuestFromListQuery(guest, listId);
		} catch (err) {
			return fail(400, { message: 'Error removing user' });
		}
		return { success: true, type: 'removeGuest' };
	},
	deleteList: async ({ params }) => {
		const { listId } = params;
		if (!listId) return;
		await deleteListAndAllItemsQuery(listId);
		throw redirect(303, `/lists`);
	}
};
