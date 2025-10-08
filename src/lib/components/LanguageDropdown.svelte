<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { LANGUAGE_COOKIE_NAME } from "$lib/cookies";

	import { useCookie } from "$lib/runes";
	import { locales } from "../../locales/locales";

	const localeCookie = useCookie<string>(LANGUAGE_COOKIE_NAME, {
		valueWhenEmpty: () => "en",
		cookieUpdateOpts: {
			expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
		},
	});

	let selectedLocale = $state<string>(localeCookie.value ?? "en");

	$effect(() => {
		if (selectedLocale === localeCookie.value) {
			return;
		}

		localeCookie.value = selectedLocale;

		invalidateAll();
	});

	let selectableLocales = locales.map((locale) => ({
		label: locale.name,
		value: locale.key,
	}));
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Language</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.RadioGroup bind:value={selectedLocale}>
				{#each selectableLocales as { label, value }}
					<DropdownMenu.RadioItem {value}>
						{label}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
