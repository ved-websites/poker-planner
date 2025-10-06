import type { Player } from "$lib";
import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import { NewPlayerEvent, PlayerLeavingEvent } from "$lib/events";
import { fail } from "@sveltejs/kit";
import { produce } from "sveltekit-sse";
import { games } from "../../../state";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ params, cookies, url }) => {
	const userId = cookies.get(USER_ID_COOKIE_NAME);

	if (!userId) {
		throw fail(400, { message: "Missing user ID" });
	}

	const game = games.get(params.gameId);

	if (!game) {
		throw fail(404, { message: "Game not found" });
	}

	const existingPlayer = game.data.players.find((p) => p.id === userId);

	const userName = existingPlayer?.name ?? url.searchParams.get("name");

	if (!userName) {
		throw fail(400, { message: "Missing user name in search params" });
	}

	const existingConnection = game.connections.get(userId);

	return produce(
		async (connection) => {
			if (existingConnection) {
				existingConnection.lock.set(false);
			}

			game.connections.set(userId, connection);

			if (!existingPlayer) {
				const newPlayer = {
					id: userId,
					name: userName,
					voted: false,
				} satisfies Player;

				game.data.players.push(newPlayer);

				const event = new NewPlayerEvent(newPlayer);

				game.connections.forEach((playerConn) => {
					playerConn.emit(...event.create());
				});
			}
		},
		{
			stop: () => {
				const remainingPlayerConns = [
					...game.connections.entries(),
				].filter(([linkUserId]) => linkUserId !== userId);

				const remainingPlayerIds = remainingPlayerConns.map(
					([userId]) => userId
				);

				game.data.players = game.data.players.filter((p) =>
					remainingPlayerIds.includes(p.id)
				);

				const event = new PlayerLeavingEvent({ id: userId });

				remainingPlayerConns.forEach(([, playerConn]) => {
					playerConn.emit(...event.create());
				});
			},
		}
	);
};
