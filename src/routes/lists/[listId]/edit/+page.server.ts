import type { List } from '$lib/models/List';
import type { User } from '$lib/models/User';
import {
	deleteListAndAllItemsQuery,
	getListQuery,
	getUserByIdQuery,
	getUserByUsernameOrEmailQuery,
	inviteUserToListQuery,
	removeGuestFromListQuery,
	removeInvitationsForListAndGuestQuery,
	unfollowListQuery,
	updateListSharedWithBasedOnInvitationsQuery
} from '$lib/pocketbase.js';
import { error, redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		error(401, 'Unauthorized');
	}

	try {
		await updateListSharedWithBasedOnInvitationsQuery(params.listId);
	} catch (err) {
		console.error(err);
	}

	let list: List;

	try {
		list = await getListQuery(params.listId);
	} catch (err) {
		console.error(err);
		throw err;
	}

	let guests: User[] = [];

	for (const guestId of list.sharedWith) {
		try {
			const user = await getUserByIdQuery(guestId);
			guests.push(user);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	return { list, guests };
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
			return fail(400, { message: 'Error updating list', type: 'update' });
		}
		return { success: true, type: 'update' };
	},
	inviteUser: async ({ request, locals, params }) => {
		const values = await request.formData();
		const usernameEmail = values.get('usernameEmail') as string;
		const { listId } = params;
		if (!listId) return;

		// find user
		let guest: User | undefined;
		try {
			guest = await getUserByUsernameOrEmailQuery(usernameEmail);
		} catch (err) {
			return fail(400, { message: 'Error finding user', type: 'invitation' });
		}

		if (!guest) return fail(400, { message: 'Error no user found', type: 'invitation' });
		if (!locals.user) return fail(400, { message: 'Error not logged in', type: 'invitation' });

		// create invitation
		try {
			await inviteUserToListQuery(locals.user.id, guest.id, listId, locals.user.username);
		} catch (err) {
			return fail(400, { message: 'Error inviting user', type: 'invitation' });
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
			return fail(400, { message: 'Error removing guest', type: 'removeGuest' });
		}
		try {
			await removeInvitationsForListAndGuestQuery(guest, listId);
		} catch (err) {
			return fail(400, { message: 'Error removing invite', type: 'removeGuest' });
		}
		return { success: true, type: 'removeGuest' };
	},
	deleteList: async ({ params }) => {
		const { listId } = params;
		if (!listId) return;
		await deleteListAndAllItemsQuery(listId);
		redirect(303, `/lists`);
	},
	unfollowList: async ({ params }) => {
		const { listId } = params;
		if (!listId) return;

		try {
			await unfollowListQuery(listId);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Error unfollowing list', type: 'unfollowList' });
		}
		redirect(303, `/lists`);
	}
};
