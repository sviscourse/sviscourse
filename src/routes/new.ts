import Course from '$lib/schemas/Course';
import type { RequestHandler } from './__types/new';
import getSlug from 'speakingurl';
import routes from '$lib/constants/routes';

export const post: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const id = getSlug(formData.get('title')! as string);
	const course = await Course.validate({
		uid: locals.user!.user_id,
		title: formData.get('title'),
		description: formData.get('description')
	});
	await locals.SVISCOURSE.put(id, JSON.stringify(course));
	return { status: 302, headers: { Location: `${routes.COURSES}/${id}` } };
};
