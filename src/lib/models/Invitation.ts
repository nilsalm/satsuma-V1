import type { InvitationState } from '$lib/types/InvitationState';

export type Invitation = {
	id: string;
	list: string;
	listName: string;
	owner: string;
	ownerName: string;
	guest: string;
	state: InvitationState;
};
