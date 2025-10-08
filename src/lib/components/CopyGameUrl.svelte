<script lang="ts">
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button";
	import * as Popover from "$lib/components/ui/popover";
	import Clipboard from "@lucide/svelte/icons/clipboard";

	let clipButtonAnchor = $state<HTMLElement>(null!);

	let isOpen = $state(false);
</script>

<Button
	bind:ref={clipButtonAnchor}
	variant="outline"
	onclick={async () => {
		await navigator.clipboard.writeText(page.url.href);

		isOpen = true;

		setTimeout(() => {
			isOpen = false;
		}, 1000);
	}}
>
	<Clipboard />
</Button>

<Popover.Root bind:open={isOpen}>
	<Popover.Trigger />
	<Popover.Content side="top" customAnchor={clipButtonAnchor} class="w-auto">
		Invite link copied!
	</Popover.Content>
</Popover.Root>
