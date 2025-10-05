<script lang="ts">
	import { goto } from "$app/navigation";
	import ChoiceSelector from "./components/ChoiceSelector.svelte";
	import GameTable from "./components/GameTable.svelte";
	import PlayerNameDialog from "./components/PlayerNameDialog.svelte";

	let { data } = $props();

	function onRevealCards() {}

	let isLoadingGame = $state(false);
</script>

{#if !data.isUserInGame}
	<PlayerNameDialog
		onSubmit={(name) => console.log(name)}
		isLoading={isLoadingGame}
		onCancel={() => goto("/")}
	/>
{/if}

<div class="grow">
	<h2 class="text-center">Welcome to <code>{data.game.name}</code>!</h2>

	<GameTable players={data.game.players} {onRevealCards} />
</div>

<div class="mb-5">
	<ChoiceSelector choices={data.game.votingSystem} />
</div>
