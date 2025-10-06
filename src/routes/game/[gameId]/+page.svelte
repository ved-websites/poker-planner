<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import type { Player } from "$lib";
	import { onDestroy } from "svelte";
	import type { Unsubscriber } from "svelte/store";
	import { source, type Source } from "sveltekit-sse";
	import ChoiceSelector from "./components/ChoiceSelector.svelte";
	import CopyGameUrl from "./components/CopyGameUrl.svelte";
	import GameTable from "./components/GameTable.svelte";
	import PlayerNameDialog from "./components/PlayerNameDialog.svelte";

	let { data } = $props();

	let game = $state(data.game);

	function onRevealCards() {}

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

	<GameTable players={game.players} {onRevealCards} />
</div>

<div class="mb-5">
	<ChoiceSelector choices={game.votingSystem} />
</div>
