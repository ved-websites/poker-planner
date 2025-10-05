<script lang="ts">
	import navbarLogo from "$lib/assets/navbar-logo.png";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
	import { m } from "$lib/paraglide/messages";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import DarkModeButton from "./DarkModeButton.svelte";
	import LanguageDropdown from "./LanguageDropdown.svelte";

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};
</script>

{#snippet ListItem({
	title,
	content,
	href,
	class: className,
	...restProps
}: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
						className
					)}
					{...restProps}
				>
					<div class="text-sm font-medium leading-none">{title}</div>
					<p
						class="text-muted-foreground line-clamp-2 text-sm leading-snug"
					>
						{content}
					</p>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}
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
								{m.navbar_menu_home()}
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
								{m.navbar_menu_about()}
							</a>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	</div>
	<div class="flex gap-5">
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
