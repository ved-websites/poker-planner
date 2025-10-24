<script lang="ts">
	import { dev } from "$app/environment";
	import { enhance } from "$app/forms";
	import type { Player } from "$lib";
	import { Button } from "$lib/components/ui/button";
	import { useFakePlayers } from "./fake-players.svelte";
	import { getEdgePositions } from "./utils";

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

	let tableWidth = 350;
	let tableHeight = 200;

	let playerPathMargin = 50;

	let playerSize = 50;

	let atLeastOnePlayerVoted = $derived(
		players.some((player) => player.vote !== undefined)
	);

	let positions = $derived(
		getEdgePositions({
			playerCount: players.length,
			tableWidth,
			tableHeight,
			playerPathMargin,
			playerSize,
		})
	);

	useFakePlayers(
		dev && false,
		players,
		(fakePlayers) => (players = fakePlayers)
	);
</script>

<div
	class="flex items-center justify-center"
	style="
		--table-margin: calc({playerPathMargin}px + {playerSize}px);
		margin-top: var(--table-margin);
		margin-bottom: var(--table-margin);
	"
>
	<div
		class="game-table bg-gray-400 flex items-center justify-center"
		style="
			--table-width: {tableWidth}px;
			--table-height: {tableHeight}px;
			--player-path-margin: {playerPathMargin}px;
		"
	>
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
						Cards revealed! Waiting for the host to start a new
						round...
					</span>
				{/if}
			</div>
		{/if}

		{#each players as player, i}
			<div class="player" style="offset-distance: {positions[i]}%;">
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
			</div>
		{/each}
	</div>
</div>

<style>
	.game-table {
		width: var(--table-width);
		height: var(--table-height);

		position: relative;
		border-radius: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.player {
		position: absolute;
		font-weight: 500;
		white-space: nowrap;
		transition: transform 0.2s;

		offset-rotate: 0deg;
		offset-path: rect(
			calc(-1 * var(--player-path-margin))
				calc(var(--player-path-margin) + var(--table-width))
				calc(var(--player-path-margin) + var(--table-height))
				calc(-1 * var(--player-path-margin))
		);
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
