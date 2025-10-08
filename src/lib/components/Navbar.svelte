<script lang="ts">
	import { version } from "$app/environment";
	import navbarLogo from "$lib/assets/navbar-logo.png";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
	import DarkModeButton from "./DarkModeButton.svelte";
	import LanguageDropdown from "./LanguageDropdown.svelte";
</script>

<nav class="navbar gap-5">
	<img
		src={navbarLogo}
		alt="Poker Planner Logo"
		style="max-height: 40px; width: auto;"
	/>
	<div class="navbar-content">
		<NavigationMenu.Root viewport={false}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a href="/" class={navigationMenuTriggerStyle()}>
								Home
							</a>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>

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
			</NavigationMenu.List>
		</NavigationMenu.Root>
	</div>
	<div class="flex gap-5 items-center">
		<a
			href="https://github.com/ved-websites/poker-planner/releases"
			class="link"
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

	.navbar-content {
		width: 100%;
		display: flex;
		align-items: center;
	}
</style>
