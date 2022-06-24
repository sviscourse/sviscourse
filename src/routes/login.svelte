<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import FbIcon from '$lib/assets/images/icons8-facebook.svg';
	import GoogleIcon from '$lib/assets/images/icons8-google.svg';
	import firebaseConfig from '$lib/configs/firebase.json';
	import routes from '$lib/constants/routes';
	import { buildUrl } from '$lib/helpers/net';
	import { deleteApp, initializeApp } from 'firebase/app';
	import {
		FacebookAuthProvider,
		getAuth,
		GoogleAuthProvider,
		inMemoryPersistence,
		signInWithPopup,
		type AuthProvider
	} from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import type { Load } from './__types/login';
	export const load: Load = ({ session, url }) => {
		if (session.user) return { status: 302, redirect: routes.HOME };
		return {
			props: { redirectUrl: url.searchParams.get('redirectUrl') }
		};
	};
</script>

<script lang="ts">
	export let redirectUrl: string | null;
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();
	const facebookProvider = new FacebookAuthProvider();
	onDestroy(() => deleteApp(app));

	const login = (provider: AuthProvider) =>
		auth
			.setPersistence(inMemoryPersistence)
			.then(() => signInWithPopup(auth, provider))
			.then((res) =>
				res.user
					.getIdToken()
					.then((idToken) =>
						goto(buildUrl(routes.SESSION_LOGIN, { idToken, redirectUrl }))
					)
			);
</script>

<svelte:head>
	<title>Login to Sviscourse</title>
</svelte:head>

<div>
	<button class="google" on:click={() => login(googleProvider)}>
		<img src={GoogleIcon} alt="Google Login" />Login with Google
	</button>
	<button class="facebook" on:click={() => login(facebookProvider)}>
		<img src={FbIcon} alt="Facebook Login" />
		Login with Facebook
	</button>
</div>

<style lang="scss">
	div {
		@include col;
		@include cross-center;
		button {
			width: 250px;
			@include row;
			@include cross-center;
		}
		button.google {
			img {
				background-color: $color0;
			}
		}
		button.facebook {
			img {
				background-color: $color1;
			}
		}
	}
</style>
