<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { superForm } from "sveltekit-superforms/client";
	import { useUserName } from "../game/data";
	import { newGameSchema } from "./schema";

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(newGameSchema),
	});

	const { form: formData, enhance } = form;

	const storedUserName = useUserName();

	$effect(() => {
		$formData.hostName = storedUserName.current;
	});
</script>

<div class="mx-auto min-w-80">
	<form method="POST" class="flex flex-col gap-3" use:enhance>
		<Form.Field {form} name="hostName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Your name</Form.Label>
					<Input
						{...props}
						bind:value={storedUserName.current}
						autocomplete="off"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="gameName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Game Name (optional)</Form.Label>
					<Input
						{...props}
						bind:value={$formData.gameName}
						autocomplete="off"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="votingSystem">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Voting System</Form.Label>
					<Input {...props} bind:value={$formData.votingSystem} />
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="onlyHostCanProgress">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex gap-5 items-center">
						<Form.Label>
							Only allow host to progress the game
						</Form.Label>
						<Checkbox
							{...props}
							bind:checked={$formData.onlyHostCanProgress}
						/>
					</div>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Button type="submit">Submit</Button>
	</form>
</div>
