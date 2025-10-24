<script lang="ts">
	import type { Player } from "$lib";

	type Props = {
		players: Player[];
		choices: string[];
		currentVote?: string | null;
	};

	let { players, choices, currentVote = null }: Props = $props();

	let voteAverage = $derived(
		players.reduce((sum, { vote }) => {
			const numericVote = Number(vote);

			return sum + (isNaN(numericVote) ? 0 : numericVote);
		}, 0) / players.filter((p) => !isNaN(Number(p.vote))).length
	);

	let formattedVoteAverage = $derived(voteAverage.toFixed(1));

	let selectedChoices = $derived.by(() => {
		const choiceCounts = choices.map((choice) => {
			const voters = players.filter((player) => player.vote === choice);

			return { choice, count: voters.length };
		});

		return choiceCounts.filter(({ count }) => count > 0);
	});

	let biggestCount = $derived(
		Math.max(...selectedChoices.map(({ count }) => count), 0)
	);
</script>

<div class="flex justify-center items-center gap-20">
	<div class="flex gap-2 justify-center items-bottom">
		{#each selectedChoices as card}
			{@const isNumberCard = !isNaN(Number(card.choice))}
			<div class="flex flex-col items-center">
				<button
					class={{
						"border rounded cursor-pointer w-14 h-24 self-end flex flex-col items-center justify-around": true,
						"bg-gray-500": currentVote === card.choice,
						"mt-4": !isNumberCard || card.count !== biggestCount,
						"mb-4": isNumberCard && card.count === biggestCount,
					}}
				>
					{#if isNumberCard && card.count === biggestCount}
						<div></div>
					{/if}

					<span>
						{card.choice}
					</span>

					{#if isNumberCard && card.count === biggestCount}
						<span> ✅ </span>
					{/if}
				</button>

				<span
					class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold"
				>
					{card.count}
				</span>
			</div>
		{/each}
	</div>

	<div>
		{#if isNaN(voteAverage)}
			<span>Seems like nobody voted a number...</span>
		{:else}
			<span>Average : {formattedVoteAverage}</span>
		{/if}
	</div>
</div>
