import { pb } from '$lib/pocketbase';
import { verifyHuman } from '$lib/recaptcha';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// before
	const token = event.request.headers.get('x-recaptcha-token');
	const isHuman = await verifyHuman(token ?? '');
	if (!isHuman) {
		return {
			status: 403,
			body: 'Forbidden'
		};
	}
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = JSON.parse(JSON.stringify(pb.authStore.model));

	const response = await resolve(event);

	// after
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
