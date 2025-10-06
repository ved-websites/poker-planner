<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import type { GameData, Player } from "$lib";
	import { onDestroy } from "svelte";
	import type { Unsubscriber } from "svelte/store";
	import { source, type Source } from "sveltekit-sse";
	import ChoiceSelector from "./components/ChoiceSelector.svelte";
	import CopyGameUrl from "./components/CopyGameUrl.svelte";
	import GameTable from "./components/GameTable.svelte";
	import PlayerNameDialog from "./components/PlayerNameDialog.svelte";

	let { data } = $props();

	let game = $state(data.game);

	let currentChoice = $state<string | null>(null);

	let gameState = $state<"setup" | "joining" | "joined">("setup");

	let connectionSource: Source | null = null;

	const eventUnsubscribers: Set<Unsubscriber> = new Set();

	function connectToGameEvents(name?: string) {
		gameState = "joining";

		const ssePath = new URL(page.url);

		if (name) {
			ssePath.searchParams.set("name", name);
		}

		connectionSource = source(`${ssePath.pathname}${ssePath.search}`);

		gameState = "joined";

		subscribeToNewPlayers();
		subscribeToPlayersLeaving();
		subscribeToPlayerVote();
		subscribeToGameRevealed();
		subscribeToGameNewRound();
	}

	function subscribeToNewPlayers() {
		if (!connectionSource) {
			return;
		}

		const newPlayerEvents = connectionSource
			.select("new-player")
			.json<Player>();

		const unsubscribe = newPlayerEvents.subscribe((newPlayer) => {
			if (!newPlayer) {
				return;
			}

			const existingPlayer = game.players.find(
				(p) => p.id === newPlayer.id
			);

			if (existingPlayer) {
				Object.assign(existingPlayer, newPlayer);
			} else {
				game.players = [...game.players, newPlayer];
			}
		});

		eventUnsubscribers.add(unsubscribe);
	}

	function subscribeToPlayersLeaving() {
		if (!connectionSource) {
			return;
		}

		const playerLeftEvents = connectionSource
			.select("player-leaving")
			.json<{ id: Player["id"] }>();

		const unsubscribe = playerLeftEvents.subscribe((player) => {
			if (!player) {
				return;
			}

			game.players = game.players.filter((p) => p.id !== player.id);
		});

		eventUnsubscribers.add(unsubscribe);
	}

	function subscribeToPlayerVote() {
		if (!connectionSource) {
			return;
		}

		const playerVotedEvents = connectionSource
			.select("player-voted")
			.json<Pick<Player, "id" | "vote">>();

		const unsubscribe = playerVotedEvents.subscribe((player) => {
			if (!player) {
				return;
			}

			const gamePlayer = game.players.find((p) => p.id === player.id);

			if (gamePlayer) {
				gamePlayer.vote = player.vote;
			}
		});

		eventUnsubscribers.add(unsubscribe);
	}

	function subscribeToGameRevealed() {
		if (!connectionSource) {
			return;
		}

		const gameRevealedEvents = connectionSource
			.select("game-reveal-cards")
			.json<GameData>();

		const unsubscribe = gameRevealedEvents.subscribe((gameData) => {
			if (!gameData) {
				return;
			}

			game = gameData;
		});

		eventUnsubscribers.add(unsubscribe);
	}

	function subscribeToGameNewRound() {
		if (!connectionSource) {
			return;
		}

		const gameNewRoundEvents = connectionSource
			.select("game-new-round")
			.json<GameData>();

		const unsubscribe = gameNewRoundEvents.subscribe((gameData) => {
			if (!gameData) {
				return;
			}

			game = gameData;

			currentChoice = null;
		});

		eventUnsubscribers.add(unsubscribe);
	}

	function clearAllSubscriptions() {
		eventUnsubscribers.forEach((unsub) => {
			unsub();

			eventUnsubscribers.delete(unsub);
		});
	}

	onDestroy(() => {
		clearAllSubscriptions();
	});

	if (data.existingUser) {
		connectToGameEvents(data.existingUser.name);
	}
</script>

{#if !data.existingUser && gameState !== "joined"}
	<PlayerNameDialog
		onSubmit={(name) => connectToGameEvents(name)}
		isLoading={gameState === "joining"}
		onCancel={() => goto("/")}
	/>
{/if}

<div class="grow">
	<h2 class="text-center">Welcome to <code>{game.name}</code>!</h2>

	<div class="flex justify-center items-center gap-2 mt-2">
		<span>Copy game url (invite link) :</span>

		<CopyGameUrl />
	</div>

	<GameTable
		players={game.players}
		isCardsRevealed={game.isCurrentlyRevealed}
	/>
</div>

{#if game.isCurrentlyRevealed}
	{@const voteAverage =
		game.players.reduce((sum, { vote }) => {
			const numericVote = Number(vote);
			return sum + (isNaN(numericVote) ? 0 : numericVote);
		}, 0) / game.players.filter((p) => !isNaN(Number(p.vote))).length}

	<div class="mb-3 self-center">
		<span>Average : {Math.round(voteAverage * 10) / 10}</span>
	</div>
{/if}

<div class="mb-5">
	<ChoiceSelector
		choices={game.votingSystem}
		locked={game.isCurrentlyRevealed}
		bind:currentVote={currentChoice}
	/>
</div>
