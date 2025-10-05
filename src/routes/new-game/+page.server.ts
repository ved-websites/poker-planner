import type { GameState } from "$lib";
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
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(newGameSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const randomId = crypto.randomUUID();

		const game = {
			id: randomId,
			name: form.data.gameName || randomId,
			players: [
				{
					id: form.data.hostId,
					name: form.data.hostName,
				},
			],
			votingSystem: form.data.votingSystem.split(","),
			createdAt: Date.now(),
		} satisfies GameState;

		games.set(randomId, game);

		return redirect(303, `/game/${randomId}`);
	},
} satisfies Actions;
