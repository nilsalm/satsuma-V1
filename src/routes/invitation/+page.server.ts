import { getInvitationsQuery } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getInvitations = async () => {
		try {
      const userId = locals.pb.authStore.baseModel.id;
			const invitation = getInvitationsQuery(userId);
			return invitation;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		invitations: getInvitations()
	};
};
