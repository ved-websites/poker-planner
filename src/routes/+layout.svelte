<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/Navbar.svelte";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Navbar />

<main class="container mx-auto py-3 px-5 flex flex-col gap-3 grow">
	{@render children?.()}
</main>
