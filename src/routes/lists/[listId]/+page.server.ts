export const load = ({ locals, params }) => {
	const getList = async (listId: string) => {
		try {
			const list = structuredClone(await locals.pb.collection('lists').getOne(listId)) as {
				id: string;
				name: string;
				isTemplate: boolean;
				user: string;
			};
			return list;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	return {
		list: getList(params.listId)
	};
};
