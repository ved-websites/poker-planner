<script lang="ts">
	import ChoiceSelector from "./components/ChoiceSelector.svelte";
	import GameTable from "./components/GameTable.svelte";

	let { data } = $props();

	function onRevealCards() {}
</script>

<div class="grow">
	<h2 class="text-center">Welcome to <code>{data.game.name}</code>!</h2>

	<GameTable game={data.game} {onRevealCards} />
</div>

<div class="mb-5">
	<ChoiceSelector choices={data.game.votingSystem} />
</div>
