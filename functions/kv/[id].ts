import { string } from 'yup';

export const onRequestGet: PagesFunction = ({ env, params }) =>
	string()
		.required()
		.validate(params.id)
		// @ts-ignore
		.then((id) => env.SVISCOURSE.get(id))
		.then((value) => new Response(value));

export const onRequestPost: PagesFunction = ({ env, params, request }) =>
	string()
		.required()
		.validate(params.id)
		// @ts-ignore
		.then(async (id) => env.SVISCOURSE.set(id, await request.text()));
