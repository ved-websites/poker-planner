import type { GameData, GameState } from "$lib";
import { USER_ID_COOKIE_NAME } from "$lib/cookies";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { games } from "../../state";
import type { Actions, PageServerLoad } from "./$types";
import { newGameSchema } from "./schema";

export const load = (async () => {
	const form = await superValidate(zod4(newGameSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(newGameSchema));

		if (!form.valid) {
			throw fail(400, { form });
		}

		const userId = cookies.get(USER_ID_COOKIE_NAME);

		if (!userId) {
			throw fail(400, { form });
		}

		const randomId = crypto.randomUUID();

		const game = {
			id: randomId,
			name: form.data.gameName || randomId,
			players: [
				{
					id: userId,
					name: form.data.hostName,
				},
			],
			votingSystem: form.data.votingSystem.split(","),
			createdAt: Date.now(),
			isCurrentlyRevealed: false,
		} satisfies GameData;

		games.set(randomId, {
			connections: new Map(),
			data: game,
		} satisfies GameState);

		return redirect(303, `/game/${randomId}`);
	},
} satisfies Actions;
