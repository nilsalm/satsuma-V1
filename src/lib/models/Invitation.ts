import type { InvitationState } from '$lib/types/InvitationState';

export type Invitation = {
	id: string;
	list: string;
	owner: string;
	ownerName: string;
	guest: string;
	state: InvitationState;
};
