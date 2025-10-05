<script lang="ts">
	import type { GameState } from "$lib";

	type Props = {
		game: GameState;
	};

	let { game }: Props = $props();

	let players = $derived(game.players);

	// let addedPlayerCount = $state(0);

	// let players = $derived([
	// 	...game.players,
	// 	...Array(addedPlayerCount)
	// 		.fill(null)
	// 		.map((_, i) => ({ id: crypto.randomUUID(), name: `Name ${i}` })),
	// ]);

	// setInterval(() => {
	// 	if (addedPlayerCount >= 15) {
	// 		addedPlayerCount = 0;
	// 	} else {
	// 		addedPlayerCount++;
	// 	}
	// }, 2000);

	function calculateLeftPosition(i: number, total: number) {
		const angle = (2 * Math.PI * i) / total;

		const rx = 270;
		const cx = 200;

		const x = cx + rx * Math.cos(angle) - 50;

		return `${x}px`;
	}

	function calculateTopPosition(i: number, total: number) {
		const angle = (2 * Math.PI * i) / total;

		const ry = 160;
		const cy = 90;

		const y = cy + ry * Math.sin(angle) - 40;

		return `${y}px`;
	}
</script>

<div class="pill-table">
	{#each players as player, i}
		<span
			class="player-pill"
			style="left: {calculateLeftPosition(
				i,
				players.length
			)}; top: {calculateTopPosition(i, players.length)};"
		>
			<div
				class={{
					"player-card flex items-center justify-center": true,
					"bg-gray-500!": player.vote === undefined,
				}}
			>
				<span>
					{#if player.voted && player.vote === undefined}
						✅
					{:else}
						{player.vote}
					{/if}
				</span>
			</div>
			{player.name}
		</span>
	{/each}
</div>

<style>
	.pill-table {
		position: relative;
		width: 400px;
		height: 180px;
		background: #f3f3f3;
		border-radius: 90px;
		margin: 10rem auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.player-pill {
		position: absolute;
		padding: 0.5em 1.2em;
		background: #fff;
		color: black;
		border-radius: 999px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
		font-weight: 500;
		white-space: nowrap;
		transition: transform 0.2s;
	}
	.player-pill:hover {
		transform: scale(1.07);
		background: #e0e7ff;
	}

	.player-card {
		width: 32px;
		height: 44px;
		background: #fff;
		border: 2px solid #e0e0e0;
		border-radius: 6px;
		margin: 0 auto 0.3em auto;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
		pointer-events: none;
	}
</style>
