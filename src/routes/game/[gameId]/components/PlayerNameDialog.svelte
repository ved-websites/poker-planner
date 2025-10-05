<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	interface Props {
		isLoading?: boolean;
		onSubmit: (name: string) => void;
		onCancel: () => void;
	}

	let { isLoading = $bindable(false), onSubmit, onCancel }: Props = $props();

	let name = $state<string>();
</script>

<AlertDialog.Root open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Enter your name</AlertDialog.Title>
			<AlertDialog.Description>
				This name will show under your card.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input
					id="name"
					bind:value={name}
					class="col-span-3"
					autocomplete="off"
				/>
			</div>
		</div>
		<AlertDialog.Footer>
			<Button onclick={onCancel}>Cancel</Button>
			<AlertDialog.Action
				disabled={!name || isLoading}
				onclick={() => onSubmit(name!)}
			>
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
