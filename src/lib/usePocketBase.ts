import PocketBase from 'pocketbase';

// const PB_URL = import.meta.env.PROD ? 'https://satsuma-be.fly.dev/' : 'http://127.0.0.1:8090'
const PB_URL_PROD = 'https://satsuma-be.fly.dev/';
// const PB_URL_DEV = 'http://127.0.0.1:8090';

let client: PocketBase | null = null;

export function getPbClient() {
	if (client !== null) return client;
	client = new PocketBase(PB_URL_PROD);
	return client;
}

export type newUserData = {
	username: string;
	password: string;
	email: string;
};
export async function createUser(data: newUserData) {
	return await getPbClient().collection('users').create(data);
}
