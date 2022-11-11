export function generateString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = ' ';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return randomString;
}
