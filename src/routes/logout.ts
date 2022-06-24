import routes from '$lib/constants/routes';
import { serialize } from 'cookie';
import type { RequestHandler } from './__types/logout';

export const get: RequestHandler = () => ({
	status: 302,
	headers: {
		Location: routes.HOME,
		'Set-Cookie': serialize('idToken', '', { path: '/', expires: new Date(0) })
	}
});
