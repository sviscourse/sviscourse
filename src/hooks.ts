import { verifyIdToken } from '$lib/helpers/firebase-admin';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import uaParser from 'ua-parser-js';

export const handle: Handle = async ({ event, resolve }) => {
	const { idToken } = parse(event.request.headers.get('cookie') || '');
	try {
		event.locals.user = await verifyIdToken(idToken);
	} catch (e) {}
	return resolve(event);
};

export const getSession: GetSession = async ({ locals, request }) => {
	const ua = uaParser(request.headers.get('user-agent') || '');
	return {
		user: locals.user,
		isMobile: ua.device.type === 'mobile'
	};
};
