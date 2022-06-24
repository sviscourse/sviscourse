import type { Course } from '$lib/@types/Course';
import * as yup from 'yup';
import c from '$lib/constants/Course';

const s = yup.string().required();

const schema: yup.SchemaOf<Course> = yup.object().shape({
	uid: s,
	title: s.min(c.titleMinL).max(c.titleMaxL),
	description: s.min(c.descriptionMinL).max(c.descriptionMaxL)
});

export default schema;
