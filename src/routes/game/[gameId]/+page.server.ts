import { fail } from "@sveltejs/kit";
import { games } from "../../../state";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
	const game = games.get(params.gameId);

	if (!game) {
		throw fail(404, { message: "Game not found" });
	}

	return {
		game,
	};
}) satisfies PageServerLoad;
