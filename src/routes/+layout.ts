import { browser } from "$app/environment";
import { locales } from "virtual:wuchale/locales";
import { loadLocale } from "wuchale/load-utils";
import type { LayoutLoad } from "./$types";

// so that the loaders are registered
import "../locales/loader.svelte.js";

export const load = (async ({ data: { locale } }) => {
	if (!locales.includes(locale)) {
		return;
	}

	if (browser) {
		await loadLocale(locale);
	}

	return {};
}) satisfies LayoutLoad;
