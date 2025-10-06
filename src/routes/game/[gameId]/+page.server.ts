import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import { fail } from "@sveltejs/kit";
import { games } from "../../../state";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
	const game = games.get(params.gameId);

	if (!game) {
		throw fail(404, { message: "Game not found" });
	}

	const userId = cookies.get(USER_ID_COOKIE_NAME);

	const existingUser = game.data.players.find((p) => p.id === userId);

	return {
		game: game.data,
		existingUser,
	};
}) satisfies PageServerLoad;
