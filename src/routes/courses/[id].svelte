<script lang="ts">
	import type { Course } from '$lib/@types/Course';

	export let course: Course;
</script>

<h1>{course.title}</h1>
<p>{course.description}</p>
