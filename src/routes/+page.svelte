<script lang="ts">
	import navbarLogo from "$lib/assets/navbar-logo.png";
	import { Button } from "$lib/components/ui/button";
	import { m } from "$lib/paraglide/messages";
</script>

<div class="flex items-center justify-center gap-10">
	<Button href="/new-game">{m.start_new_game()}</Button>

	<img src={navbarLogo} alt="Poker Planner Logo" />
</div>
