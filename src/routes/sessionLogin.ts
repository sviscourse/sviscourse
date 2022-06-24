import routes from '$lib/constants/routes';
import { verifyIdToken } from '$lib/helpers/firebase-admin';
import { serialize } from 'cookie';
import type { RequestHandler } from './__types/sessionLogin';
import yup from 'yup';

export const get: RequestHandler = async ({ url }) => {
	const { idToken, redirectUrl } = await yup
		.object()
		.shape({
			idToken: yup.string().required(),
			redirectUrl: yup.string().nullable()
		})
		.validate({
			idToken: url.searchParams.get('idToken'),
			redirectUrl: url.searchParams.get('redirectUrl')
		});
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
