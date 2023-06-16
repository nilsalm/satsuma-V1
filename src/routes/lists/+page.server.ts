import { getInvitationsQuery, getListsQuery, updateInvitationStateQuery } from '$lib/pocketbase';
import { InvitationState } from '$lib/types/InvitationState.js';
import { redirect, type Actions } from '@sveltejs/kit';

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
	const getInvitations = async () => {
		try {
			return await getInvitationsQuery(locals.user?.id ?? '');
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		lists: getLists(),
		invitations: getInvitations()
	};
};

export const actions: Actions = {
	acceptInvitation: async ({ request }) => {
		const values = await request.formData();
		const id = String(values.get('invitationId'));
		try {
			await updateInvitationStateQuery(id, InvitationState.Accepted);
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	},
	declineInvitation: async ({ request }) => {
		const values = await request.formData();
		const id = String(values.get('invitationId'));
		try {
			await updateInvitationStateQuery(id, InvitationState.Declined);
		} catch (e) {
			console.error(e);
			throw e;
		}
		return { success: true };
	}
};
