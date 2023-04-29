import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getLists = async () => {
		try {
			const lists = JSON.parse(
				JSON.stringify(
					await locals.pb.collection('lists').getFullList(undefined, {
						filter: 'created >= "2022-01-01 00:00:00"'
					})
				)
			) as Array<{
				id: string;
				name: string;
				isTemplate: boolean;
				user: string;
			}>;
			return lists;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		lists: getLists()
	};
};
