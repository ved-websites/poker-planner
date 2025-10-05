import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import { paraglideMiddleware } from "$lib/paraglide/server";
import type { Handle } from "@sveltejs/kit";

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		const userId = event.cookies.get(USER_ID_COOKIE_NAME);

		if (!userId) {
			event.cookies.set(USER_ID_COOKIE_NAME, crypto.randomUUID(), {
				path: "/",
				httpOnly: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
			});
		}

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace("%paraglide.lang%", locale),
		});
	});

export const handle: Handle = handleParaglide;
