import { adapter as svelte } from "@wuchale/svelte"
import { adapter as js } from 'wuchale/adapter-vanilla'
import { defineConfig } from "wuchale"
import { locales } from "./src/locales/locales.js"

export default defineConfig({
	sourceLocale: locales.find(({ isDefault }) => isDefault)?.key ?? 'en',
	otherLocales: locales.filter(({ isDefault }) => !isDefault).map(({ key }) => key),
	adapters: {
		main: svelte(),
		js: js({
			files: [
				'src/**/+{page,layout}.{js,ts}',
				'src/**/+{page,layout}.server.{js,ts}',
			],
		})
	},
})