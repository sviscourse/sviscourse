import routes from '$lib/constants/routes';
import { verifyIdToken } from '$lib/helpers/firebase-admin';
import { serialize } from 'cookie';
import * as yup from 'yup';
import type { RequestHandler } from './__types/sessionLogin';

export const get: RequestHandler = async ({ url }) => {
	const g = (k: string) => url.searchParams.get(k);
	const idToken = await yup.string().required().validate(g('idToken'));
	const redirectUrl = await yup.string().validate(g('redirectUrl'));
	await verifyIdToken(idToken);
	return {
		status: 302,
		headers: {
			'Set-Cookie': serialize('idToken', idToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60
			}),
			Location: redirectUrl ?? routes.HOME
		}
	};
};
