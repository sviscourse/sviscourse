/// <reference types="@sveltejs/kit" />

interface UserInfo {
	readonly displayName: string | null;
	readonly email: string | null;
	readonly phoneNumber: string | null;
	readonly photoURL: string | null;
	readonly providerId: string;
	readonly uid: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: UserInfo | undefined;
	}
	// interface Platform {}
	interface Session {
		user: UserInfo | undefined;
	}
	// interface Stuff {}
}
