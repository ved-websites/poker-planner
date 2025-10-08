import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { nodeLoaderPlugin } from "@vavite/node-loader/plugin";
import { defineConfig } from "vite";
import { wuchale } from '@wuchale/vite-plugin'

export default defineConfig({
	plugins: [
		tailwindcss(),
		wuchale(),
		sveltekit(),
		nodeLoaderPlugin(),
	],
	optimizeDeps: {
		include: ["zod"],
	},
});
