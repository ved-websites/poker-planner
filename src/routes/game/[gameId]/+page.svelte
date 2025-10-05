<script lang="ts">
	import ChoiceSelector from "./components/ChoiceSelector.svelte";
	import GameTable from "./components/GameTable.svelte";

	let { data } = $props();
</script>

<div class="grow">
	<h2>Welcome to <code>{data.game.name}</code>!</h2>

	<GameTable game={data.game} />
</div>

<div class="mb-5">
	<ChoiceSelector choices={data.game.votingSystem} />
</div>
