import type { RequestHandler } from './__types/[id]';

export const get: RequestHandler = async ({ locals, params }) => {
	const courseSt = await locals.SVISCOURSE.get(params.id);
	if (!courseSt) {
		return { status: 404 };
	}
	return { body: { course: JSON.parse(courseSt) } };
};
