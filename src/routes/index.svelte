<script lang="ts">
	import routes from '$lib/constants/routes';

	export let keys: { name: string }[];
</script>

{#each keys as key}
	<a href={`${routes.COURSES}/${key.name}`}>{key.name}</a>
{/each}
