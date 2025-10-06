import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import {
	GameNewRoundCardsEvent,
	GameRevealCardsEvent,
	PlayerVotedEvent,
} from "$lib/events";
import { fail } from "@sveltejs/kit";
import { games } from "../../../state";
import type { Actions, PageServerLoad } from "./$types";

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

export const actions = {
	vote: async ({ request, params, cookies }) => {
		const game = games.get(params.gameId);

		if (!game) {
			return fail(404, { message: "Game not found" });
		}

		const userId = cookies.get(USER_ID_COOKIE_NAME);

		if (!userId) {
			return fail(400, { message: "User ID cookie not found" });
		}

		const existingPlayer = game.data.players.find((p) => p.id === userId);

		if (!existingPlayer) {
			return fail(400, { message: "User not part of this game" });
		}

		const formData = await request.formData();
		const vote = formData.get("vote");

		if (
			typeof vote !== "string" ||
			(!game.data.votingSystem.includes(vote) && vote !== "☕")
		) {
			return fail(400, { message: "Invalid vote" });
		}

		existingPlayer.vote = vote;

		const event = new PlayerVotedEvent(existingPlayer);

		game.connections.forEach((conn) => {
			conn.emit(...event.create());
		});

		return { success: true };
	},
	reveal: async ({ params }) => {
		const game = games.get(params.gameId);

		if (!game) {
			return fail(404, { message: "Game not found" });
		}

		game.data.isCurrentlyRevealed = true;

		const event = new GameRevealCardsEvent(game.data);

		game.connections.forEach((conn) => {
			conn.emit(...event.create());
		});

		return { success: true };
	},
	newround: async ({ params }) => {
		const game = games.get(params.gameId);

		if (!game) {
			return fail(404, { message: "Game not found" });
		}

		game.data.isCurrentlyRevealed = false;
		game.data.players.forEach((p) => {
			p.vote = undefined;
		});

		const event = new GameNewRoundCardsEvent(game.data);

		game.connections.forEach((conn) => {
			conn.emit(...event.create());
		});

		return { success: true };
	},
} satisfies Actions;
