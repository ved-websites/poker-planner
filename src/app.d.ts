// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	/**
	 * Util to easily create Svelte Snippet props.
	 *
	 * Set keys of type `void` to create a snippet with no args, or
	 * set keys with a typed array of the args given for this specific snippet.
	 */
	type SProps<S extends { [key: PropertyKey]: void | unknown[] } = {}> = {
		[K in keyof S]: S[K] extends void
			? Snippet
			: Snippet<NonNullable<S[K]>>;
	} & { [rest: PropertyKey]: unknown };

	type Awaitable<T> = T | PromiseLike<T>;
	type Prettify<T> = {
		[K in keyof T]: T[K];
	} & unknown;
}

export {};
