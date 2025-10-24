import type { Player } from "$lib";

export function useFakePlayers(
	active: boolean,
	players: Player[],
	setPlayersValue: (fakePlayers: Player[]) => void,
	options?: Partial<{
		/** @default 0 */
		start: number;
		/** @default 10 */
		max: number;
		/** @default true */
		rolling: boolean;
		/** @default 2000 */
		delay: number;
	}>
) {
	if (!active) {
		return;
	}

	const initialPlayers = players ?? [];

	let addedPlayerCount = $state(options?.start ?? 0);

	$effect(() => {
		const fakePlayers = [
			...initialPlayers,
			...Array(addedPlayerCount)
				.fill(null)
				.map<(typeof initialPlayers)[number]>((_, i) => ({
					id: crypto.randomUUID(),
					name: `Name ${i}`,
					voted: false,
				})),
		];

		setPlayersValue(fakePlayers);
	});

	if (options?.rolling !== false) {
		setInterval(() => {
			if (addedPlayerCount >= (options?.max ?? 10)) {
				addedPlayerCount = options?.start ?? 0;
			} else {
				addedPlayerCount++;
			}
		}, options?.delay ?? 2000);
	}
}
