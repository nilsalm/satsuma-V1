import { RECAPTCHA_SECRET_KEY } from '$env/static/private';

export const verifyHuman = async (token: string) => {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
		{
			method: 'POST'
		}
	);
	const data = await response.json();
	console.log(data);
	return data.success && data.score > 0.5;
};
