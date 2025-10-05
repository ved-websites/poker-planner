<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input";
	import { getUserId } from "$lib/components/user-id/data.svelte";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { superForm } from "sveltekit-superforms/client";
	import { newGameSchema } from "./schema";

	let { data } = $props();

	let userId = getUserId();

	const form = superForm(data.form, {
		validators: zod4Client(newGameSchema),
		onSubmit: ({ formData }) => {
			formData.set("hostId", userId.current);
		},
	});

	const { form: formData, enhance } = form;
</script>

<div class="mx-auto min-w-80">
	<form method="POST" class="flex flex-col gap-3" use:enhance>
		<Form.Field {form} name="hostName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Your name</Form.Label>
					<Input {...props} bind:value={$formData.hostName} />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="gameName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Game Name (optional)</Form.Label>
					<Input {...props} bind:value={$formData.gameName} />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="votingSystem">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Voting System</Form.Label>
					<Input {...props} bind:value={$formData.votingSystem} />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Button type="submit">Submit</Button>
	</form>
</div>
