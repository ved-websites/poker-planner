<script lang="ts">
	type Props = {
		choices: string[];
		currentVote?: string | null;
	};

	let { choices, currentVote = $bindable(null) }: Props = $props();
</script>

<div class="flex gap-2 justify-center items-bottom">
	{#each choices as card}
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
