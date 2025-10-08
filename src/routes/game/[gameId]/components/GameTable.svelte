<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Player } from "$lib";
	import { Button } from "$lib/components/ui/button";

	type Props = {
		players: Player[];
		isCardsRevealed: boolean;
		activateGameButtons: boolean;
	};

	let {
		players,
		isCardsRevealed = $bindable(false),
		activateGameButtons = true,
	}: Props = $props();

	// const initialPlayers = players;

	// let addedPlayerCount = $state(7);

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
	// 		addedPlayerCount = 7;
	// 	} else {
	// 		addedPlayerCount++;
	// 	}
	// }, 2000);

	function calculateLeftPosition(i: number, total: number) {
		const angle = (2 * Math.PI * i) / total;
		// Circle radius and center
		const r = 200;
		const cx = 100;
		const x = cx + r * Math.cos(angle) - 35;
		return `${x}px`;
	}

	function calculateTopPosition(i: number, total: number) {
		const angle = (2 * Math.PI * i) / total;
		const r = 200;
		const cy = 100;
		const y = cy + r * Math.sin(angle) - 25;
		return `${y}px`;
	}

	let atLeastOnePlayerVoted = $derived(
		players.some((player) => player.vote !== undefined)
	);
</script>

<div class="circle-table bg-gray-400">
	{#if activateGameButtons}
		{#if !isCardsRevealed}
			<form action="?/reveal" method="POST" use:enhance>
				<Button type="submit" disabled={!atLeastOnePlayerVoted}>
					Reveal cards
				</Button>
			</form>
		{:else}
			<form action="?/newround" method="POST" use:enhance>
				<Button type="submit">Start new round</Button>
			</form>
		{/if}
	{:else}
		<div class="flex items-center justify-center w-3/4">
			{#if !isCardsRevealed}
				<span class="text-center italic">
					Waiting for the host to reveal the cards...
				</span>
			{:else}
				<span class="text-center italic">
					Cards revealed! Waiting for the host to start a new round...
				</span>
			{/if}
		</div>
	{/if}

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
					"bg-gray-500!":
						player.vote === undefined && !isCardsRevealed,
					"italic bg-gray-300!":
						player.vote === undefined && isCardsRevealed,
				}}
			>
				<span class="text-black">
					{#if !isCardsRevealed && player.vote !== undefined}
						✅
					{:else if isCardsRevealed}
						{player.vote ?? "☕"}
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
		width: 225px;
		height: 225px;
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
