<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { m } from "$lib/paraglide/messages";
	import { getLocale, locales, setLocale } from "$lib/paraglide/runtime";

	let selectableLocales = locales.map((locale) => ({
		label: m.locale_name({}, { locale }),
		value: locale,
		onSelect: () => setLocale(locale),
	}));
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">{m.locale_label()}</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.RadioGroup value={getLocale()}>
				{#each selectableLocales as { label, value, onSelect }}
					<DropdownMenu.RadioItem {value} {onSelect}>
						{label}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
