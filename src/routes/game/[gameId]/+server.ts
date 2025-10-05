import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import { fail } from "@sveltejs/kit";
import { produce } from "sveltekit-sse";
import { games } from "../../../state";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ params, cookies }) => {
	const userId = cookies.get(USER_ID_COOKIE_NAME);

	if (!userId) {
		throw fail(400, { message: "Missing user ID" });
	}

	const game = games.get(params.gameId);

	if (!game) {
		throw fail(404, { message: "Game not found" });
	}

	const existingConnection = game.connections.get(userId);

	return produce(
		async (connection) => {
			// if (existingPlayer?.connection) {
			// 	existingPlayer.connection.lock.set(false);
			// }
		},
		{
			stop: () => {
				game.data.players = game.data.players.filter(
					(p) => p.id !== userId
				);
			},
		}
	);
};
