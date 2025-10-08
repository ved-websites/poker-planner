<script lang="ts">
	import { version } from "$app/environment";
	import navbarLogo from "$lib/assets/navbar-logo.png";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
	import { gameContext } from "$lib/runes/game.context.svelte";
	import CopyGameUrl from "./CopyGameUrl.svelte";
	import DarkModeButton from "./DarkModeButton.svelte";
	import LanguageDropdown from "./LanguageDropdown.svelte";

	const game = gameContext.get();
</script>

<nav class="navbar gap-5">
	<div class="w-full flex items-center">
		<NavigationMenu.Root viewport={false}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a
								href="/"
								class={{
									"flex items-center self-center": true,
								}}
							>
								<img
									src={navbarLogo}
									alt="Poker Planner Logo"
									style="max-height: 40px; width: auto;"
								/>
							</a>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>

				{#if !game.value}
					<NavigationMenu.Item>
						<NavigationMenu.Link>
							{#snippet child()}
								<a
									href="/about"
									class={navigationMenuTriggerStyle()}
								>
									About
								</a>
							{/snippet}
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				{/if}
			</NavigationMenu.List>
		</NavigationMenu.Root>

		{#if game.value}
			<div class="mx-auto flex items-center gap-15">
				<div>
					{#if game.value.name}
						<code>{game.value.name}</code>
					{:else}
						<span>
							Game ID: <code>{game.value.id}</code>
						</span>
					{/if}
				</div>

				<div class="flex justify-center items-center gap-2">
					<span>Copy game url (invite link) :</span>

					<CopyGameUrl />
				</div>
			</div>
		{/if}
	</div>
	<div class="flex gap-5 items-center">
		<a
			href="https://github.com/ved-websites/poker-planner/releases"
			class="link"
			target="_blank"
		>
			v{version}
		</a>
		<LanguageDropdown />
		<DarkModeButton />
	</div>
</nav>

<style>
	.navbar {
		width: 100vw;
		position: sticky;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		padding: 0.5rem 2rem;
		display: flex;
		align-items: center;
	}
</style>
