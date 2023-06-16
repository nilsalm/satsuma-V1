import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { Item } from './models/Item';
import type { Category } from './models/Category';
import { deepClone } from './util';
import type { List } from './models/List';
import type { User } from './models/User';
import { InvitationState } from './types/InvitationState';
import type { Invitation } from './models/Invitation';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

export async function getItemsInListQuery(listId: string, picked: boolean = false) {
	const items = await pb.collection('items').getFullList<Item>({
		filter: `created >= "2022-01-01 00:00:00" && list = "${listId}" && picked = ${picked}`
	});
	return items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			picked: item.picked,
			quantity: item.quantity,
			category: item.category ? item.category : null,
			list: item.list
		} as Item;
	});
}

export async function getCategoryQuery(id: string) {
	const category = await pb.collection('categories').getOne<Category>(id);
	return {
		id: category.id,
		name: category.name,
		owner: category.owner,
		sharedWith: category.sharedWith,
		order: category.order
	} as Category;
}

export async function deleteCategoryQuery(id: string) {
	await pb.collection('categories').delete(id);
}

export async function getItemsPerCategory(id: string) {
	const items = await pb.collection('items').getFullList<Item>({
		filter: `created >= "2022-01-01 00:00:00" && category = "${id}"`
	});
	return items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			picked: item.picked,
			quantity: item.quantity,
			category: item.category ? item.category : null,
			list: item.list
		} as Item;
	});
}

export async function getCategoriesQuery() {
	const categories = deepClone(await pb.collection('categories').getFullList<Category>());
	return categories
		.map((category) => {
			return {
				id: category.id,
				name: category.name,
				owner: category.owner,
				sharedWith: category.sharedWith,
				order: category.order
			} as Category;
		})
		.sort((a, b) => a.order - b.order);
}

export async function getListsQuery() {
	const lists = deepClone(
		await pb.collection('lists').getFullList<List>({
			filter: 'created >= "2022-01-01 00:00:00"'
		})
	);

	return lists.map((list) => {
		return {
			id: list.id,
			name: list.name,
			isTemplate: list.isTemplate,
			owner: list.owner,
			sharedWith: list.sharedWith
		} as List;
	});
}

export async function getTemplatesQuery() {
	const templates = deepClone(
		await pb.collection('lists').getFullList<List>({
			filter: 'created >= "2022-01-01 00:00:00" && isTemplate = true'
		})
	);
	return templates.map((template) => {
		return {
			id: template.id,
			name: template.name,
			isTemplate: template.isTemplate,
			owner: template.owner,
			sharedWith: template.sharedWith
		} as List;
	});
}

export async function getListQuery(listId: string) {
	const list = deepClone(await pb.collection('lists').getOne<List>(listId));
	return {
		id: list.id,
		name: list.name,
		isTemplate: list.isTemplate,
		owner: list.owner,
		sharedWith: list.sharedWith
	} as List;
}

export async function deleteListAndAllItemsQuery(listId: string) {
	let page = 1;
	let totalPages = 1;
	try {
		while (page <= totalPages) {
			const itemsRecord = await pb.collection('items').getList(1, 500, {
				filter: `list = '${listId}'`
			});
			page = itemsRecord.page;
			totalPages = itemsRecord.totalPages;

			if (itemsRecord.items.length > 0) {
				await Promise.all(
					itemsRecord.items.map(async (item) => await pb.collection('items').delete(item.id))
				);
			}
		}
	} catch (e) {
		console.error(e);
		return { success: false, error: e };
	}
	await pb.collection('lists').delete(listId);
}

export async function deleteCategoryAndAllItemsQuery(categoryId: string) {
	let page = 1;
	let totalPages = 1;

	try {
		while (page <= totalPages) {
			const itemsRecord = await pb.collection('items').getList(1, 500, {
				filter: `category = '${categoryId}'`
			});
			page = itemsRecord.page;
			totalPages = itemsRecord.totalPages;

			if (itemsRecord.items.length > 0) {
				await Promise.all(
					itemsRecord.items.map(async (item) => await pb.collection('items').delete(item.id))
				);
			}
		}
	} catch (e) {
		console.error(e);
		return { success: false, error: e };
	}
	await pb.collection('categories').delete(categoryId);
}

export async function updateItemQuery(item: Item) {
	await pb.collection('items').update(item.id, item);
}

export async function getUserByUsernameOrEmailQuery(usernameEmail: string) {
	const users = await pb
		.collection('users')
		.getList(1, 50, { filter: `username = "${usernameEmail}" || email = "${usernameEmail}"` });
	return users.items.length > 0 ? users.items[0] : undefined;
}

export async function getUserByIdQuery(id: string) {
	const user = await pb.collection('users').getOne<User>(id);
	return {
		id: user.id,
		username: user.username,
		email: user.email
	} as User;
}

export async function inviteUserToListQuery(
	owner: string,
	guest: string,
	list: string,
	ownerName: string,
	listName: string
) {
	const invite = {
		owner,
		guest,
		list,
		ownerName,
		listName,
		state: InvitationState.Pending as string
	};
	await pb.collection('invitations').create(invite);

	await pb
		.collection('lists')
		.update(list, { sharedWith: [...(await getListQuery(list)).sharedWith, guest] });
}

export async function removeGuestFromListQuery(guest: string, list: string) {
	await pb
		.collection('lists')
		.update(list, { sharedWith: (await getListQuery(list)).sharedWith.filter((g) => g !== guest) });
}

export async function updateInvitationStateQuery(invitationId: string, state: InvitationState) {
	await pb.collection('invitations').update(invitationId, { state: state as string });
}

export async function getInvitationsQuery(userId: string) {
	const invitations = await pb
		.collection('invitations')
		.getList(1, 50, { filter: `guest = "${userId}"`, sort: '-created' });

	return invitations.items.map((invitation) => {
		return {
			id: invitation.id,
			owner: invitation.owner,
			ownerName: invitation.ownerName,
			guest: invitation.guest,
			list: invitation.list,
			state: invitation.state as InvitationState
		} as Invitation;
	});
}

export async function updateListSharedWithBasedOnInvitationsQuery(listId: string) {
	const invitations = await pb.collection('invitations').getList(1, 50, {
		filter: `list = "${listId}" && state = "${InvitationState.Accepted}" || state = "${InvitationState.Pending}"`
	});

	const sharedWith = invitations.items.map((invitation) => invitation.guest);

	await pb.collection('lists').update(listId, { sharedWith });
}
