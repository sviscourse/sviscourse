/// <reference types="@sveltejs/kit" />

interface UserInfo {
	readonly user_id: string;
	readonly name: string;
	readonly email: string;
	readonly picture: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: UserInfo | undefined;
		SVISCOURSE: {
			get(key: string): Promise<string | null>;
			put(key: string, value: string): Promise<void>;
			list(): Promise<{ keys: { name: string }[] }>;
			delete(key: string): Promise<void>;
		};
	}
	interface Platform {
		env: { SVISCOURSE: KVNamespace };
	}
	interface Session {
		user: UserInfo | undefined;
	}
	// interface Stuff {}
}
