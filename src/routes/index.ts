import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async ({ locals }) => ({
	body: { keys: (await locals.SVISCOURSE.list()).keys }
});
