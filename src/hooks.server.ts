import { LANGUAGE_COOKIE_NAME, USER_ID_COOKIE_NAME } from "$lib/cookies";
import type { Handle } from "@sveltejs/kit";
import { locales } from "virtual:wuchale/locales";
import { loadLocales, runWithLocale } from "wuchale/load-utils/server";
import { key, loadCatalog, loadIDs } from "./locales/loader.server.svelte";

loadLocales(key, loadIDs, loadCatalog, locales);

export const handle: Handle = async ({ event, resolve }) => {
	const userId = event.cookies.get(USER_ID_COOKIE_NAME);

	if (!userId) {
		event.cookies.set(USER_ID_COOKIE_NAME, crypto.randomUUID(), {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
		});
	}

	const locale = event.cookies.get(LANGUAGE_COOKIE_NAME) ?? "en";

	event.locals.locale = locale;

	return runWithLocale(locale, () => resolve(event));
};
