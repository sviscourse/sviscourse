<script lang="ts" context="module">
	import Course from '$lib/constants/Course';

	import routes from '$lib/constants/routes';
	import { buildUrl } from '$lib/helpers/net';
	import type { Load } from './__types/new';

	export const load: Load = ({ session }) => {
		if (!session.user)
			return {
				status: 302,
				redirect: buildUrl(routes.LOGIN, { redirectUrl: routes.NEW })
			};
		return {};
	};
</script>

<form method="post">
	<label>
		Title
		<input
			type="text"
			name="title"
			placeholder="How to..."
			required
			minlength={Course.titleMinL}
			maxlength={Course.titleMaxL}
		/>
	</label>
	<label>
		Description
		<textarea
			name="description"
			rows="10"
			required
			minlength={Course.descriptionMinL}
			maxlength={Course.descriptionMaxL}
		/>
	</label>
	<div>
		<input type="submit" value="Create" />
	</div>
</form>

<style lang="scss">
	form {
		@include col;
		label {
			@include col;
		}
	}
</style>
