<script lang="ts">
	import GameTable from "./components/GameTable.svelte";

	let { data } = $props();

	let currentVote = $state<string | null>(null);
</script>

<div class="grow">
	<h2>Welcome to <code>{data.game.name}</code>!</h2>

	<GameTable game={data.game} clientVote={currentVote} />
</div>

<div class="mb-5">
	<div class="flex gap-2 justify-center items-bottom">
		{#each data.game.votingSystem as card}
			<button
				class={{
					"border rounded cursor-pointer w-14 h-24 self-end": true,
					"mb-5 bg-gray-500": currentVote === card,
					"hover:bg-gray-800": currentVote !== card,
				}}
				onclick={() => (currentVote = card)}
			>
				{card}
			</button>
		{/each}
	</div>
</div>
