<script lang="ts">
	import type { Player } from "$lib";

	type Props = {
		players: Player[];
		onRevealCards: () => Awaitable<void>;
	};

	let { players, onRevealCards }: Props = $props();

	// let addedPlayerCount = $state(0);

	// let players = $derived([
	// 	...game.players,
	// 	...Array(addedPlayerCount)
	// 		.fill(null)
	// 		.map<(typeof game.players)[number]>((_, i) => ({
	// 			id: crypto.randomUUID(),
	// 			name: `Name ${i}`,
	// 			voted: false,
	// 		})),
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
		// Circle radius and center
		const r = 220;
		const cx = 100;
		const x = cx + r * Math.cos(angle) - 20;
		return `${x}px`;
	}

	function calculateTopPosition(i: number, total: number) {
		const angle = (2 * Math.PI * i) / total;
		const r = 220;
		const cy = 100;
		const y = cy + r * Math.sin(angle) - 20;
		return `${y}px`;
	}
</script>

<div class="circle-table">
	<button class="reveal-cards-btn" onclick={onRevealCards}>
		Reveal cards
	</button>
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
	.circle-table {
		position: relative;
		width: 250px;
		height: 250px;
		background: #f3f3f3;
		border-radius: 50%;
		margin: 10rem auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.reveal-cards-btn {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		padding: 0.7em 1.5em;
		background: #6366f1;
		color: #fff;
		border: none;
		border-radius: 999px;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
		cursor: pointer;
		transition: background 0.2s;
		white-space: nowrap;
	}
	.reveal-cards-btn:hover {
		background: #4338ca;
	}

	.player-pill {
		position: absolute;
		padding: 0.5em 1.2em;
		/* background: #fff; */
		/* color: black; */
		/* border-radius: 999px; */
		/* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07); */
		font-weight: 500;
		white-space: nowrap;
		transition: transform 0.2s;
	}
	.player-pill:hover {
		transform: scale(1.07);
		/* background: #e0e7ff; */
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
