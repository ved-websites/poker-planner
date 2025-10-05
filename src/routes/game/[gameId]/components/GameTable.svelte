<script lang="ts">
	import type { Player } from "$lib";
	import { Button } from "$lib/components/ui/button";

	type Props = {
		players: Player[];
		onRevealCards: () => Awaitable<void>;
	};

	let { players, onRevealCards }: Props = $props();

	// const initialPlayers = players;

	// let addedPlayerCount = $state(0);

	// $effect(() => {
	// 	players = [
	// 		...initialPlayers,
	// 		...Array(addedPlayerCount)
	// 			.fill(null)
	// 			.map<(typeof initialPlayers)[number]>((_, i) => ({
	// 				id: crypto.randomUUID(),
	// 				name: `Name ${i}`,
	// 				voted: false,
	// 			})),
	// 	];
	// });

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

	let atLeastOnePlayerVoted = players.some((player) => player.voted);
</script>

<div class="circle-table bg-gray-400">
	<Button onclick={onRevealCards} disabled={!atLeastOnePlayerVoted}>
		Reveal cards
	</Button>
	{#each players as player, i}
		<span
			class="player"
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
		border-radius: 50%;
		margin: 10rem auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.player {
		position: absolute;
		padding: 0.5em 1.2em;
		font-weight: 500;
		white-space: nowrap;
		transition: transform 0.2s;
	}
	.player:hover {
		transform: scale(1.07);
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
