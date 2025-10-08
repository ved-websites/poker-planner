<script lang="ts">
	import { enhance } from "$app/forms";
	import { untrack } from "svelte";

	type Props = {
		choices: string[];
		currentVote?: string | null;
		locked: boolean;
	};

	let {
		choices,
		currentVote = $bindable(null),
		locked = $bindable(false),
	}: Props = $props();

	let allChoices = $derived([...choices, "☕"]);

	let formRef = $state<HTMLFormElement>(null!);

	$effect(() => {
		const form = untrack(() => formRef);

		if (currentVote !== null) {
			form.requestSubmit();
		}
	});
</script>

<div class="flex gap-2 justify-center items-bottom">
	{#each allChoices as card}
		<button
			class={{
				"border rounded cursor-pointer w-14 h-24 self-end": true,
				"mb-5 bg-gray-500": currentVote === card,
				"mt-5": currentVote !== card,
				"hover:bg-gray-800": !locked && currentVote !== card,
				"italic cursor-not-allowed!": locked,
			}}
			onclick={() => (currentVote = card)}
			disabled={locked}
		>
			{card}
		</button>
	{/each}
</div>

<form
	action="?/vote"
	method="POST"
	class="hidden"
	use:enhance
	bind:this={formRef}
>
	<input type="hidden" name="vote" value={currentVote} />
</form>
