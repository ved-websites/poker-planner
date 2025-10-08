<script lang="ts">
	import type { GameData } from "$lib";
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/Navbar.svelte";
	import { gameContext } from "$lib/runes/game.context.svelte";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";

	let { children } = $props();

	let game = $state<GameData | null>(null);

	gameContext.set({
		get value() {
			return game;
		},
		set value(value) {
			game = value;
		},
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Navbar />

<main class="container mx-auto py-3 px-5 flex flex-col gap-3 grow">
	{@render children?.()}
</main>
