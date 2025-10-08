import { browser } from "$app/environment";

export function getCookie(name: string) {
	if (!browser) {
		return;
	}

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		return parts.pop()!.split(";").shift();
	}
}

export type CookieUpdateOptions = {
	expiration: Date;
};

export function updateCookie(
	key: string,
	value?: string | null,
	options?: Partial<CookieUpdateOptions>
) {
	if (!browser) {
		return;
	}

	if (value) {
		const expiration = options?.expiration
			? options.expiration.toUTCString()
			: false;

		document.cookie = `${key}=${value}; SameSite=Lax; path=/${
			expiration ? `; expires=${expiration}` : ""
		}`;
	} else {
		document.cookie = `${key}=; expires=01 Jan 1970 00:00:01 UTC; path=/`;
	}
}

export type CookieOptions<T> = {
	valueWhenEmpty: () => T;
	cookieUpdateOpts: Partial<CookieUpdateOptions>;
};

export function useCookie<T extends string = string>(
	key: string,
	options?: Partial<CookieOptions<T>>
) {
	const { valueWhenEmpty, cookieUpdateOpts } = options ?? {};

	let cookieState = $state<T>();

	return {
		get value(): T | undefined {
			if (!browser) return;

			const cookieValue = getCookie(key);

			if (cookieValue === undefined) {
				return valueWhenEmpty?.();
			} else {
				return cookieValue as T;
			}
		},
		set value(value: T | undefined) {
			updateCookie(key, value, cookieUpdateOpts);

			if (value === undefined) {
				cookieState = valueWhenEmpty?.();
			} else {
				cookieState = value;
			}
		},
	};
}
