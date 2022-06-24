<script>
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';
	import routes from '$lib/constants/routes';
	import 'modern-normalize/modern-normalize.css';
	import '../app.scss';
</script>

<main>
	<header>
		<h1><a href={routes.HOME}>Sviscourse</a></h1>
		<input type="text" placeholder="Search..." />
		<button on:click={() => goto(routes.NEW)}>New course</button>
		{#if $session.user}
			<a href={routes.LOGOUT}>Logout</a>
		{:else}
			<a href={routes.LOGIN}>Login</a>
		{/if}
	</header>
	<div>
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		@include col;
		header {
			@include row;
			@include cross-center;
			@include pad-y-20;
		}
		input {
			@include grow;
		}
		div {
			@include col;
			@include pad-20;
		}
	}
</style>
