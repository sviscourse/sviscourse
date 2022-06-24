import { verifyIdToken } from '$lib/helpers/firebase-admin';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import uaParser from 'ua-parser-js';

const svisCourse: Record<string, string> = {};

export const handle: Handle = async ({ event, resolve }) => {
	const { idToken } = parse(event.request.headers.get('cookie') || '');
	try {
		event.locals.user = await verifyIdToken(idToken);
	} catch (e) {}
	event.locals.SVISCOURSE = event.platform?.env.SVISCOURSE ?? {
		get: (key: string) => svisCourse[key],
		put: (key: string, value: string) => (svisCourse[key] = value),
		list: () => ({ keys: Object.keys(svisCourse).map((name) => ({ name })) }),
		delete: (key: string) => delete svisCourse[key]
	};
	return resolve(event);
};

export const getSession: GetSession = async ({ locals, request }) => {
	const ua = uaParser(request.headers.get('user-agent') || '');
	return {
		user: locals.user,
		isMobile: ua.device.type === 'mobile'
	};
};
